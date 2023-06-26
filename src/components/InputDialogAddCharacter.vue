<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent width="1024">
            <template v-slot:activator="{ props }">
                <v-btn  class="ml-3" elevation="0" variant="outlined" color="pink-lighten-1" v-bind="props">
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
                            <v-col cols="12" sm="5">
                                <v-text-field label="角色代号*" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="7">
                                <v-text-field label="角色名称" hint="不填则默认显示为代号对应的名称" persistent-hint></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="备注"></v-text-field>
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
                    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                        保存
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts" setup>
const dialog = ref(false)
</script>