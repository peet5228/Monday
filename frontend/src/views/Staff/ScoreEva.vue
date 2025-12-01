<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-form v-if="user.status_eva === 2 || user.status_eva === 3">
                    <h1 class="text-h5 font-weight-bold">แบบประเมินตนเอง</h1>
                    <v-card class="mt-2 pa-2">
                        <p>ชื่อ : {{ user.first_name }} {{ user.last_name }}</p>
                        <p>รอบประเมินที่ : {{ user.round_sys }} ปี {{ user.year_sys }} </p>
                    </v-card>
                    <v-row v-for="(topic,index1) in topics" :key="topic.id_topic" class="mt-4">
                        <v-col cols="12">
                            <h1 class="text-h6 font-weight-bold">{{ index1+1 }}.{{ topic.name_topic }}</h1>
                            
                        </v-col>
                    </v-row>
                </v-form>
                <v-alert v-else-if="user.status_eva === 1" type="info">ยังไม่ได้กรอกแบบประเมิน</v-alert>
                <v-alert v-else type="warning">ยังไม่มีแบบประเมิน</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const id_eva = useRoute().params.id_eva
const token = localStorage.getItem('token')
const topics = ref([])
const user = ref({})
const fetchUser = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Staff/checkEva/${id_eva}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        user.value = res.data
    }catch(err){
        console.error('โหลดข้อมูลผู้ประเมินไม่สำเร็จ',err)
    }
}

const fetchTopic = async () =>{
    try{
        const res = await axios.get(`http://localhost:3001/api/Staff/checkEva/indicate/${id_eva}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        topics.value = res.data
        console.log(res.data)
    }catch(err){
        console.error('โหลดข้อมูลผู้ประเมินไม่สำเร็จ',err)
    }
}
onMounted(async () =>{
    await Promise.all([fetchTopic(),fetchUser()])
})

</script>

<style scoped>

</style>