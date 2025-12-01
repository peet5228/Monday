<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-h5 text-center font-weight-bold text-maroon">จัดการหัวข้อการประเมิน</h1>
                    <v-form @submit.prevent="saveMember">
                        <v-row class="mt-4">
                            <v-col cols="12" md="6">
                                <v-select v-model="form.id_topic" :items="topic.map(t=> ({title:t.name_topic,value:t.id_topic}))" :error-messages="error.id_topic" label="หัวข้อการประเมิน" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.name_indicate" :error-messages="error.name_indicate" label="ชื่อตัวชี้วัด"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-textarea v-model="form.detail_indicate" :error-messages="error.detail_indicate" label="รายละเอียด" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.point_indicate" type="number" :error-messages="error.point_indicate" label="น้ำหนักคะแนน" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select v-model="form.check_indicate" :items="[{title:'มี',value:'y'},{title:'ไม่มี',value:'n'}]" :error-messages="error.check_indicate" label="ลักษณะตัวเลือกคะแนน" />
                            </v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="submit" color="blue" class="w-full text-white">{{ form.id_indicate ? 'อัปเดต' : 'บันทึก' }}</v-btn></v-col>
                            <v-col cols="12" md="6" class="text-center"><v-btn type="reset" color="error" class="w-full text-white">ยกเลิก</v-btn></v-col>
                        </v-row>
                    </v-form>

                    <br>

                    <v-table class="table">
                        <thead>
                            <tr class="bg-gray-400">
                                <th class="border text-center">ลำดับ</th>
                                <th class="border text-center">หัวข้อ</th>
                                <th class="border text-center">ชื่อตัวชี้วัด</th>
                                <th class="border text-center">รายละเอียด</th>
                                <th class="border text-center">น้ำหนักคะแนน</th>
                                <th class="border text-center">ลักษณะตัวเลือกคะแนน</th>
                                <th class="border text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(items,index) in result" :key="items.id_indicate">
                                <td class="text-center border">{{ index+1 }}</td>
                                <td class="text-center border">{{ items.name_topic }}</td>
                                <td class="text-center border">{{ items.name_indicate }}</td>
                                <td class="text-center border">{{ items.detail_indicate }}</td>
                                <td class="text-center border">{{ items.point_indicate }}</td>
                                <td class="text-center border">{{ items.check_indicate === 'y' ? 'มี' : 'ไม่มี' }}</td>
                                <td class="text-center border">
                                    <v-btn color="warning" class="text-white" size="small" @click="edit(items)">แก้ไข</v-btn>&nbsp;
                                    <v-btn color="error" class="text-white" size="small" @click="del(items.id_indicate)">ลบ</v-btn>
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
const topic = ref([])

const form = ref({
    id_indicate:null,
    id_topic:'',
    name_indicate:'',
    detail_indicate:'',
    point_indicate:'',
    check_indicate:'',
})

const reset = () => {
    form.value = {
        id_indicate:null,
    id_topic:'',
    name_indicate:'',
    detail_indicate:'',
    point_indicate:'',
    check_indicate:'',
    }
}

const edit = (items:any) => {
    form.value = {...items}
}

const fetch = async () => {
    try{
        const r = await axios.get(`${api}/topic`,{headers: {Authorization: `Bearer ${token}`}})
        topic.value = r.data
        const res = await axios.get(`${api}/indicate`,{headers: {Authorization: `Bearer ${token}`}})
        result.value = res.data
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const error = ref<Record<string,string>>({})

function vaildateForm(){
    error.value = {}
    const f = form.value
    if(!f.id_topic)error.value.name_topic='กรุณาเลือกหัวข้อ'
    if(!f.name_indicate)error.value.name_indicate='กรุณากรอกชื่อตัวชี้วัด'
    if(!f.detail_indicate)error.value.detail_indicate='กรุณากรอกรายละเอียด'
    if(!f.point_indicate)error.value.point_indicate='กรุณากรอกน้ำหนักคะแนน'
    if(!f.check_indicate)error.value.check_indicate='กรุณาเลือกลัษณะตัวเลือกคะแนน'
    return Object.keys(error.value).length === 0
}
const saveMember = async () =>{
    if(!vaildateForm())return
    try{
        if(form.value.id_indicate){
            await axios.put(`${api}/indicate/${form.value.id_indicate}`,form.value,{headers: {Authorization: `Bearer ${token}`}})
        }else{
            await axios.post(`${api}/indicate`,form.value,{headers: {Authorization: `Bearer ${token}`}})
        }
        alert('ทำรายการสำเร็จ')
        await fetch()
        await reset()
    }catch(err){
        console.error('บันทึกไม่สำเร็จ',err)
    }
}

const del = async (id_indicate:number) => {
    try{
        if(!confirm('ต้องการลบใช่หรือไม่')) return
        await axios.delete(`${api}/indicate/${id_indicate}`,{headers: {Authorization: `Bearer ${token}`}})
        await fetch()
        await reset()
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