<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="border text-center w-1/10">ลำดับ</th>
                                <th class="border text-center w-1/10">ชื่อ</th>
                                <th class="border text-center w-1/10">นามสกุล</th>
                                <th class="border text-center w-1/10">วันที่ออกแบบประเมิน</th>
                                <th class="border text-center w-1/10">รอบประเมิน</th>
                                <th class="border text-center w-1/10">คะแนนประเมิน</th>
                                <th class="border text-center w-1/10">ดำเนินการยืนยันผล</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="text-center w-1/10 border">{{ index+1 }}</td>
                                <td class="text-center w-1/10 border">{{ items.first_name }}</td>
                                <td class="text-center w-1/10 border">{{ items.last_name }}</td>
                                <td class="text-center w-1/10 border">{{ items.day_eva }}</td>
                                <td class="text-center w-1/10 border">รอบที่ {{ items.round_sys }}</td>
                                <td class="text-center w-1/10 border">{{ items.total_eva }} คะแนน</td>
                                <td class="text-center w-1/10 border">
                                    <v-btn v-if="items.signature" color="green" class="text-white" size="small">ยืนยันผลแล้ว</v-btn>
                                    <v-btn v-else color="blue" class="text-white" size="small" @click="add(items.id_eva)">ยืนยันผล</v-btn>
                                </td>
                            </tr>
                            <tr class="" v-if="result.length === 0">
                                <td class="text-center text-gray-500 border" colspan="8">ไม่พบข้อมูล</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';
const token = localStorage.getItem('token')
const api = import.meta.env?.VITE_BASE_API || 'http://localhost:3001/api/Commit'
const router = useRouter()
const result = ref([])
const fetch = async () => {
    try{
        const res = await axios.get(`${api}/show_eva`,{headers: {Authorization: `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}
const add = (id_eva:number) => {
    router.push({path:`/Signature_save/${id_eva}`})
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