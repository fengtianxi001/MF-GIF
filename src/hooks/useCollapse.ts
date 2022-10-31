import { Ref, watch } from 'vue';

export function useCollapse(element: Ref<HTMLElement | undefined>, defaultStatus?: boolean) {
  const collapsed = ref(defaultStatus === true);
  const onToggle = () => {
    collapsed.value = !collapsed.value;
  };
  const onCollapsed = () => {
    //折叠操作
    const ele = element.value as HTMLElement;
    ele.style.height = '0px';
  };
  const onUncollaps = () => {
    //展开操作
    const ele = element.value as HTMLElement;
    const clone = ele.cloneNode(true) as HTMLElement;
    clone.style.height = 'auto';
    clone.style.position = 'fixed';
    clone.style.visibility = 'hidden';
    document.body.appendChild(clone);
    const clientHeight = clone?.clientHeight;
    console.log('clientHeight', clientHeight);
    document.body.removeChild(clone);
    ele.style.height = clientHeight + 'px';
  };
  onMounted(() => {
    watch(collapsed, () => (collapsed.value ? onCollapsed() : onUncollaps()));
  });
  return {
    collapsed,
    onToggle,
  };
}
