import { ref } from "vue"

export function useTable() {
  const data = ref<any[]>([])
  const filter = ref<any[]>([])
  const filterConfigs = ref<any[]>([])

  const selected = ref<any[]>([])
  const columns = ref<any[]>([])
  const query = () => {}

  return {
    data,
    filter,
    filterConfigs,
    selected,
    columns,
    query,
  }
}
