const express = require('express')
const db = require('../../db')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const uploadDir = path.join(__dirname,'../../uploads/signature')
const {verifyToken,requireRole} = require('../../middleware/authMiddleware')

// API สำหรับ Upload ข้อมูล
router.post('/',verifyToken,async (req,res) => {
    try{
        const file = req.files?.file
        const filename = Date.now() + path.extname(file.name).toLowerCase()
        await file.mv(path.join(uploadDir,filename))
        await db.query(`update tb_commit set signature=? where id_eva=? and id_member=?`,[filename])
        res.status(201).json({message:'Upload Success'})
    }catch(err){
        console.error("Error Upload",err)
        res.status(500).json({message:'Error Upload'})
    }
})

// API สำหรับ Delete ข้อมูล
router.delete('/:id_doc',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try{
        const {id_doc} = req.params
        const [[doc]] = await db.query(`select file from tb_doc where id_doc='${id_doc}'`)
        const fp = path.join(uploadDir,doc.file)
        if(fs.existsSync(fp)){
            fs.unlinkSync(fp)
        }
        await db.query(`delete from tb_doc where id_doc='${id_doc}'`)
        res.json({message:'Delete Success'})
    }catch(err){
        console.error("Error Delete",err)
        res.status(500).json({message:'Error Delete'})
    }
})

module.exports = router