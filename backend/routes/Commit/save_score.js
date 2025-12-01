const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken} = require('../../middleware/authMiddleware')
router.get('/:id_eva',verifyToken,async (req,res) => {
    try{
        const id_member = req.user.id_member
        const id_eva = req.params.id_eva
        const [rows] = await db.query(`select * from tb_member m,tb_eva e,tb_system s,tb_commit c where c.id_member=? and c.id_eva=? and c.id_eva=e.id_eva and e.id_member=m.id_member and e.id_sys=s.id_sys and status_sys=? order by e.id_eva desc`,
            [id_member,id_eva,'y']
        )
        res.json(rows[0])
    }catch(err){
        console.error('Error Profile',err)
        res.status(500).json({message:'Error Profile'})
    }
})

router.get('/indicate/:id_eva',verifyToken,async (req,res) => {
    try{
        const id_member = req.user.id_member
        const id_eva = req.params.id_eva
        const [topics] = await db.query(`select * from tb_topic`)
        const [indicates] = await db.query(`select * from tb_indicate i,tb_evadetail d where i.id_indicate=d.id_indicate and d.status_eva=? and d.id_eva=?`,
            [1,id_eva]
        )
        const result = topics.map(t =>({
            ...t,
            indicates:indicates.filter((i) => i.id_topic === t.id_topic)
        }))
        res.json(result)
    }catch(err){
        console.error('Error Indicate and Topic',err)
        res.status(500).json({message:'Error Indicate and Topic'})
    }
})

router.post('/:id_eva',verifyToken,async (req,res) => {
    try{
        const id_member = req.user.id_member
        const id_eva = req.params.id_eva
        const scores = JSON.parse(req.body.scores)
        const detail_commit = req.body.detail_commit
        const [[roleCommit]] = await db.query(`select * from tb_commit where id_eva=? and id_member=?`,
            [id_eva,id_member]
        )
        var statusCommit = 0
        if(roleCommit.level_commit === 'ประธาน'){
            statusCommit = 2
        }else if(roleCommit.level_commit === 'กรรมการ'){
            statusCommit = 3
        }else if(roleCommit.level_commit === 'เลขา'){
            statusCommit = 4
        }else{
            statusCommit = 0
        }
        for(const item of scores){
            await db.query(
                `insert into tb_evadetail (id_eva,id_indicate,status_eva,score_commit) values(?,?,?,?)`,
                [id_eva,item.id_indicate,statusCommit,item.score]
            )
        }
        const [[sumRow]] = await db.query(
            `select coalesce(sum(score_commit*(select i.point_indicate from tb_indicate i where i.id_indicate=d.id_indicate)),0) as total
            from tb_evadetail d where id_eva=?`,[id_eva]
        )
        await db.query(
            `update tb_eva set total_commit=? where id_eva=?`,
            [sumRow.total,id_eva]
        )
        await db.query(
            `update tb_commit set status_commit=?,detail_commit=? where id_eva=? and id_member=?`,
            ['y',detail_commit,id_eva,id_member]
        )
        res.json({message:'บันทึกคะแนนสำเร็จ'})
    }catch(err){
        console.error('Error Indicate and Topic',err)
        res.status(500).json({message:'Error Indicate and Topic'})
    }
})

module.exports = router