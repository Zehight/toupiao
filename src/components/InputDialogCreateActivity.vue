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
                                <v-text-field label="新活动名称*" v-model="actName" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="开始时间*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="结束时间*" hint="必须在开始时间之后" persistent-hint
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-file-input chips multiple label="投票封面"></v-file-input>
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
import {create} from '@/api/activity'
const actName = ref([]) as any | string
const actImg = ref([]) as any | number
const actRemark = ref([]) as any | string
const dialog = ref(false)
const createForm = reactive({
    name: actName.toString(),
    startTime: (new Date()).toDateString(),
    endTime: (new Date()).toDateString(),
    frontImg: actImg,
    remark: actRemark.toString(),
})
const submit = async () => {
  const data = await create(createForm)
  console.log(data);
}
</script>