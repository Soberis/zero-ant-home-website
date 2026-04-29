/**
 * 将数字格式化为固定两位，不足前补零。
 * 用于列表序号展示，如 01、02、03。
 */
export function formatIndex(value: number): string {
  return value.toString().padStart(2, "0");
}
