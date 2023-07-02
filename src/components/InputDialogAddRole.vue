<template>
    <v-dialog v-model="dialog" persistent width="500">
        <template v-slot:activator="{ props }">
            <v-btn class="ml-4 mt-1" elevation="0" variant="outlined" color="pink-lighten-1" v-bind="props">
                <slot />
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">添加角色</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-autocomplete v-model="roleSelect" :items="roleItems" item-title="state" item-value="id"
                                label="角色名称" return-object :readonly="readonly"></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete v-model="roleSelect" :items="roleItems" item-title="code" item-value="id"
                                label="角色代号" return-object :readonly="readonly"></v-autocomplete>
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
</template>
<script lang="ts" setup>
import { addRoleToGroup } from '@/api/group'
import { getRoleList } from '@/api/role'
const prop = defineProps(['groupId'])
const roleSelect = ref([]) as any
const roleItems = ref([]) as any
const dialog = ref(false)
const readonly = ref(true)
const loading = ref(false)
const disableSubmit = () => {
    console.log(roleSelect.value)
    return !roleSelect.value.id
}
const submit = async () => {
    loading.value = true
    const data = await addRoleToGroup(prop.groupId, roleSelect.value.id)
    console.log(data);
    setTimeout(() => { loading.value = false }, 500)
}
const initRoleList = async () => {
    loading.value = true
    const data = await getRoleList() as any
    for (let v of data.list) {
        roleItems.value.push({ state: v.name, code: v.code, id: v.id })
    }
    setTimeout(() => { loading.value = false; readonly.value = false }, 500)
}
initRoleList()
console.log(roleItems);
</script>