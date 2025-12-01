<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-h5 text-center font-weight-bold text-maroon">รายงานผลการประเมินของผู้รับการประเมิน</h1>
                    รายชื่อผู้รับการประเมินผล
                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">ผู้รับการประเมิน</th>
                                <th class="border text-center">รอบการประเมิน</th>
                                <th class="border text-center">วันที่ออกแบบประเมิน</th>
                                <th class="border text-center">สถานะการประเมิน</th>
                                <th class="border text-center">รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_eva">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.first_name }} {{ items.last_name }}</td>
                                <td class="text-center border">รอบที่ {{ items.round_sys }} ปี {{ items.year_sys }}</td>
                                <td class="text-center border">{{ items.day_eva }}</td>
                                <td class="text-center border">
                                    <v-btn :color="bg(items.status_eva)" class="text-white" size="small">{{ items.status_eva === 1 ? 'ประเมินตนเอง' : items.status_eva === 2 ? 'กรรมการปะเมิน' : 'ประเมินเสร็จสิ้น' }}</v-btn>
                                </td>
                                <td class="text-center border">
                                    <v-btn color="success" class="text-white" size="small" @click="add(items.id_eva)">รายละเอียด</v-btn>
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

const api = import.meta.env?.VITE_BASE_API || 'http://localhost:3001/api/Staff'
const router = useRouter()

const result = ref([])

const fetch = async () => {
    try{
        const res = await axios.get(`${api}/eva/all`,{headers: {Authorization: `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const bg = (status_eva:string) => {
    if(status_eva === 1) return 'blue'
    if(status_eva === 2) return 'warning'
    if(status_eva === 3) return 'success'
}

const add = (id_eva:number) => {
    router.push({path:`ScoreEva/${id_eva}`})
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