<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
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
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="开始时间*" v-model="startTime" :rules="[rules.require, rules.isDate]"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="结束时间*" v-model="endTime"
                                    :rules="[rules.require, rules.isDate, rules.end]" hint="必须在开始时间之后" persistent-hint
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-file-input label="投票封面" v-model="actImg" @change="uploadImg" chips multiple></v-file-input>
                            </v-col>
                            <v-col cols="12">
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
                    <v-btn color="blue-darken-1" variant="text" @click="submit">
                        保存
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts" setup>
import { create } from '@/api/activity'
import { upload } from '@/api/file'
import { isString } from '@vue/shared'
const actName = ref([]) as any | string
const startTime = ref([]) as any | number
const endTime = ref([]) as any | number
const actImg = ref([]) as any | [File]
const actImgID = ref(0)
const actRemark = ref([]) as any | string
const dialog = ref(false)
const rules = {
    require: (value: any) => !!value || '该项目不能为空',
    isDate: (value: any) => /[0-9]{2,4}-[0-9]{1,2}-[0-9]{1,2}/.test(value) || '请填写如同“2018-12-1”的数据',
    end: (value: any) => !startTime.value || Date.parse(value) > Date.parse(startTime.value) || '必须在开始时间之后',
}
const submit = async () => {
    // uploadImg(null)
    const createForm = reactive({
        name: actName.value,
        startTime: startTime.value,
        endTime: endTime.value,
        frontImg: actImg.value.length ? actImg.value : 123,
        remark: actRemark.value,
    })
    console.log(createForm);
    const data = await create(createForm)
    console.log(data);
}
const uploadImg = async (a:any) => {
    console.log(a,actImg.value);
    const img = await upload(actImg)
    console.log(img);
}
</script>