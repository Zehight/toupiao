<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" transition="dialog-top-transition" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn color="pink-lighten-2" v-bind="props">
                    <slot />
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">创建新活动</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <!-- <v-date-picker></v-date-picker> -->
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="新活动名称*" v-model="actName" :rules="[rules.require]"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="3">
                                <v-text-field label="开始时间*" v-model="startTime" :rules="[rules.require, rules.isDate]"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" lg="3">
                                <v-text-field label="结束时间*" v-model="endTime"
                                    :rules="[rules.require, rules.isDate, rules.end]" hint="必须在开始时间之后" persistent-hint
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-file-input label="投票封面" v-model="actImg" @change="uploadImg" chips></v-file-input>
                            </v-col>
                            <v-col cols="12" sm="8" v-if="actImgID">
                                <v-img aspect-ratio="16/9" cover max-height="25vw" :src="fileUrl(actImgID)">
                                    <template v-slot:placeholder>
                                        <div class="d-flex align-center justify-center fill-height">
                                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                                        </div>
                                    </template>
                                </v-img>
                            </v-col>
                            <v-col cols="12" md="7">
                                <v-text-field label="备注" v-model="actRemark"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*表示必填项目</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        关闭
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="submit" :disabled="loading||disableSubmit()" :loading="loading">
                        提交
                        <template v-slot:loader>
                            <v-progress-linear indeterminate></v-progress-linear>
                        </template>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts" setup>
import { create } from '@/api/activity'
import { upload, fileUrl } from '@/api/file'
const actName = ref(undefined) as any | string
const startTime = ref(undefined) as any | string
const endTime = ref(undefined) as any | string
const actImg = ref(undefined) as any | [File?]
const actImgID = ref('')
const actRemark = ref(undefined) as any | string
const dialog = ref(false)
const loading = ref(false)
const rules = {
    require: (value: any) => !!value || '该项目不能为空',
    isDate: (value: any) => /[0-9]{2,4}-[0-9]{2}-[0-9]{2}/.test(value) || '请填写如同“2018-12-01”的数据',
    end: (value: any) => !startTime.value || Date.parse(value) > Date.parse(startTime.value) || '必须在开始时间之后',
}
const disableSubmit = ()=>{
    return !actName.value || !startTime.value || !endTime.value
}
const submit = async () => {
    loading.value = true
    const createForm = reactive({
        name: actName.value,
        startTime: startTime.value,
        endTime: endTime.value,
        frontImg: actImgID.value ? actImgID.value : '',
        remark: actRemark.value,
    })
    console.log(createForm);
    const data = await create(createForm)
    console.log(data);
    setTimeout(() => { loading.value = false }, 500)
}
const uploadImg = async (e: any) => {
    if (actImg.value[0]) {
        loading.value = true
        const imgForm = reactive({
            file: actImg.value[0],
        })
        const img = await upload(imgForm)
        actImgID.value = img.id || ''
        setTimeout(() => { loading.value = false }, 500)
    }
    else {
        actImgID.value = ''
    }
}
</script>