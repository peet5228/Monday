const express = require('express')
const db = require('../../db')
const router = express.Router()
const {verifyToken} = require('../../middleware/authMiddleware')
const path = require('path')
const uploadDir = path.join(__dirname,'../../uploads/evadetail')
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
        const [topics] = await db.query(`select * from tb_topic`)
        const [indicates] = await db.query(`select * from tb_indicate i,tb_evadetail d where i.id_indicate=d.id_indicate and d.status_eva=? and d.id_eva=?`,
            [statusCommit,id_eva]
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

module.exports = router