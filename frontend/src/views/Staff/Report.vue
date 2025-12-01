<template>
    <v-container fluid class="py-10">
                <v-card class="pa-4">
                    <h1 class="text-h5 text-center font-weight-bold text-maroon">รายงาน</h1>
                    <br>
                    <v-row>
                        <v-col cols="12" md="4">
                            <router-link to="reEva"><v-card class="pa-4" elevation="3"><p class="text-h4 font-weight-bold">ผู้รับการประเมินผล</p></v-card></router-link>
                        </v-col>
                    </v-row>
                </v-card>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref,onMounted,computed } from 'vue';
import { useRouter } from 'vue-router';
const token = localStorage.getItem('token')

const api = import.meta.env?.VITE_BASE_API || 'http://localhost:3001/api'
const router = useRouter()

const tab = ref(1)
const box = ref([])
const user = ref([])


const fetch = async () => {
    try{
        const r = await axios.get(`${api}/Staff/eva/all`,{headers: {Authorization: `Bearer ${token}`}})
        result.value = r.data
        const res = await axios.get(`${api}/dashboard/staff`,{headers: {Authorization: `Bearer ${token}`}})
        box.value = res.data.box
        box2.value = res.data.box2
    }catch(err){
        console.error('Error Fetching',err)
    }
}

const error = ref<Record<string,string>>({})

function vaildateForm(){
    error.value = {}
    const f = form.value
    if(!f.name_topic)error.value.name_topic='กรุณากรอกชื่อหัวข้อ'
    return Object.keys(error.value).length === 0
}
const bg = (status_eva:string) => {
    if(status_eva === 1) return 'blue'
    if(status_eva === 2) return 'warning'
    if(status_eva === 3) return 'success'
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