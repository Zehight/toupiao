<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn class="ml-3" elevation="0" variant="outlined" color="green-lighten-1" v-bind="props">
                    <slot />
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">添加组别</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="7">
                                <v-text-field label="组别名称" v-model="groupName" hint="不填则默认显示为“第X组”" persistent-hint
                                    :readonly="loading"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="5">
                                <v-text-field label="组内晋级人数*" v-model="promotedNum" required
                                    :readonly="loading"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <v-text-field label="组内投票人数上限*" v-model="voteNum" required
                                    :readonly="loading"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="3">
                                <v-text-field label="批量生成组别数量*" v-model="addNum" required
                                    :readonly="loading"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*表示必填项目</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="close">
                        关闭
                    </v-btn>
                    <v-btn color="blue-darken-1" variant="text" @click="submit" :disabled="loading || disableSubmit()"
                        :loading="loading">
                        保存
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
import { add } from '@/api/group'
const prop = defineProps(['roundId', 'update'])
const groupName = ref(undefined) as any | string
const promotedNum = ref(undefined) as any | string
const voteNum = ref('1')
const addNum = ref(1)
const dialog = ref(false)
const loading = ref(false)
const disableSubmit = () => {
    return !groupName.value || !promotedNum.value || !voteNum.value
}
const close = () => {
    dialog.value = false
}
const submit = async () => {
    loading.value = true
    const createForm = reactive({
        name: groupName.value || '第X组',
        roundId: prop.roundId,
        promotedNum: promotedNum.value,
        voteNum: voteNum.value,
    })
    const data = await add(createForm)
    setTimeout(() => {
        if (0 + addNum.value > 1) {
            addNum.value--
            submit()
        }
        else {
            prop.update(prop.roundId)
            loading.value = false
        }
    }, 500)
}
</script>