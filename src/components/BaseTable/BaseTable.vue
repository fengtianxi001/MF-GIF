<template>
  <div class="base-table">
    <div class="base-table-operates">
      <Space>
        <Button v-for="item in operates" v-bind="{ ...item }">
          {{ item.text }}
        </Button>
      </Space>
      <Space>
        <span>共 {{ data.length }} 条数据</span>
        <span>/</span>
        <span>已选择 {{ selectedKeys.length }} 条</span>
      </Space>
    </div>

    <Table
      class="base-table-pro"
      size="small"
      row-key="id"
      v-model:selectedKeys="selectedKeys"
      :columns="columns"
      :data="data"
      :stripe="true"
      :pagination="false"
      :hoverable="false"
      :draggable="{ type: 'handle', width: 40 }"
      :row-selection="{
        type: 'checkbox',
        showCheckedAll: true,
        onlyCurrent: false,
      }"
      :bordered="{
        wrapper: true,
        cell: true,
        headerCell: true,
        bodyCell: true,
      }"
      v-bind="{ ...options }"
    >
    </Table>
    <div class="base-table-empty" v-show="isEmpty">
      <icon-empty class="empty-icon" />
      <div class="empty-text">暂无数据</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Table, Space, Button } from '@arco-design/web-vue'
import { computed } from 'vue'
import { IconEmpty } from '@arco-design/web-vue/es/icon'

interface PropsType {
  columns: any[]
  operates?: any[]
  options?: any
  selected?: any[]
  data: any[]
}
const props = defineProps<PropsType>()

const emit = defineEmits(['update:selected'])

const isEmpty = computed(() => {
  return !props.data || props.data.length <= 0
})
const selectedKeys = computed({
  get: () => props.selected,
  set: (val) => emit('update:selected', val),
})
</script>
<style lang="scss">
.base-table {
  position: relative;
  height: 100%;
  .base-table-operates {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .base-table-pro {
    z-index: 10;
    height: calc(100% - 60px);
    overflow: auto;
    table-layout: fixed;
    border-collapse: collapse;

    // background-color: var(--color-fill-1);
    border: 1px solid var(--color-neutral-3);
    .arco-table-th,
    .arco-table-td:not(.arco-table-tr-expand) {
      &:last-child {
        border-right: none;
      }
    }
    .arco-table-container {
      // border-top: none;
      border: none;
    }
    tr:last-child {
      .arco-table-td {
        // border-bottom: none;
      }
    }
    .arco-spin {
      height: unset;
    }
    .arco-table-content-scroll-x {
      overflow-x: unset;
      overflow-y: unset;
    }
    thead {
      tr {
        position: sticky;
        top: 0;
        z-index: 99;
      }

      user-select: none;
    }
    .arco-table-td-content:empty::before {
      display: block;
      color: var(--color-fill-4);
      content: '--';
    }
  }
  .base-table-empty {
    position: absolute;
    top: 84px;
    z-index: 999;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100% - 90px);
    color: rgb(var(--gray-5));
    letter-spacing: 0;

    // background-color: var(--color-neutral-1);
    border-right: 1px solid var(--color-neutral-3);
    border-bottom: 1px solid var(--color-neutral-3);
    border-left: 1px solid var(--color-neutral-3);
    .empty-icon {
      font-size: 50px;
    }
    .empty-text {
      // font-size: 20px;
    }
  }
}
</style>
<style lang="scss">
.arco-table-empty {
  thead {
    position: relative;
    z-index: 9999;
  }
  tbody {
    display: none;
    height: 0 !important;
  }
}
</style>
