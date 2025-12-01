<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-h5 text-center font-weight-bold text-maroon">ยืนยันผลการประเมิน ผู้รับการประเมิน</h1>
                    <div v-if="result.signature">
                        <v-card class="pa-4">
                            ไฟล์ที่แนบ : <v-btn @click="openFile(result.signature)" color="blue" size="small">ดูไฟล์</v-btn>&nbsp;&nbsp;&nbsp;&nbsp;
                            <v-btn @click="del(id_eva)" color="red" size="small">ลบไฟล์</v-btn>
                        </v-card>
                    </div>
                    <v-form v-else @submit.prevent="saveMember">
                        <v-row class="mt-4">
                            <v-col cols="12" md="12">
                                <v-file-input v-model="file" accenpt=".png,.pdf,.JPG,.PNG,.docx,.doc,.image/*" label="ไฟล์" />
                            </v-col>
                            <v-btn type="submit" color="blue" class="w-full text-white">บันทึก</v-btn>
                        </v-row>
                    </v-form>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router';
const token = localStorage.getItem('token')

const api = import.meta.env?.VITE_BASE_API || 'http://localhost:3001/api/Commit'
const router = useRouter()
const id_eva = useRoute().params.id_eva

const result = ref([])
const file = ref<File | null>(null)
const openFile = (filename:string) =>{
    const url = `http://localhost:3001/uploads/signature/${filename}`
    window.open(url,'_Blank')
}
const fetch = async () => {
    try{
        const res = await axios.get(`${api}/signature/${id_eva}`,{headers: {Authorization: `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const saveMember = async () =>{
    if(!file.value) return alert('กรุณาแนบเอกสาร')
    try{
        const formData = new FormData()
        formData.append("file",file.value)
        await axios.post(`${api}/signature/${id_eva}`,formData,{headers: {Authorization: `Bearer ${token}`}})
        alert('ทำรายการสำเร็จ')
        await fetch()
    }catch(err){
        console.error('ทำรายการไม่สำเร็จ',err)
    }
}

const del = async (id_eva:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${api}/signature/${id_eva}`,{headers: {Authorization: `Bearer ${token}`}})
        await fetch()
    }catch(err){
        console.error("Error Delete",err)
    }
}

onMounted(fetch)
</script>

<style scoped>
.btn-maroon{
    background-color: #7d0c14;
}
.text-maroon{
    color: #7d0c14;
}
</style>