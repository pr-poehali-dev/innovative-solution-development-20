import { useState, useRef } from "react"
import * as XLSX from "xlsx"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedText } from "@/components/ui/animated-text"
import { GradientButton } from "@/components/ui-library/buttons/gradient-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

export interface ModbusRegister {
  id: string
  prefix: string
  name: string
  descr_en: string
  descr_ru: string
  addr: number | ""
  cmd: string
  type: string
  coeff: string
  byte_conv: string
  reg_count: number | ""
  interf_type: string
  group: string
  subgroup: string
  readonly: number
  history: number
  interval: number | ""
  db: string
  type_db: string
  unit: string
  comment: string
  data_range: string
  device: string
}

const CMD_OPTIONS = ["REG", "COIL", "DI", "IR"]
const TYPE_OPTIONS = ["U16", "S16", "U32", "S32", "F32", "F64", "BOOL", "STR"]
const BYTE_CONV_OPTIONS = ["ABCD", "DCBA", "BADC", "CDAB"]
const INTERF_TYPE_OPTIONS = ["U16", "U32", "S16", "S32", "F32", "F64", "BOOL"]
const TYPE_DB_OPTIONS = ["WORD", "DWORD", "FLOAT", "BOOL", "INT", "DINT", "REAL"]

function createEmptyRegister(addr: number): ModbusRegister {
  return {
    id: crypto.randomUUID(),
    prefix: "HPS1_",
    name: "",
    descr_en: "",
    descr_ru: "",
    addr,
    cmd: "REG",
    type: "U16",
    coeff: "",
    byte_conv: "ABCD",
    reg_count: 1,
    interf_type: "U16",
    group: "hps",
    subgroup: "states",
    readonly: 0,
    history: 1,
    interval: 1000,
    db: "",
    type_db: "WORD",
    unit: "",
    comment: "",
    data_range: "",
    device: "",
  }
}

const INITIAL_REGISTERS: ModbusRegister[] = [
  { id: crypto.randomUUID(), prefix: "HPS1_", name: "Status", descr_en: "on/off", descr_ru: "Статус работы", addr: 0, cmd: "REG", type: "U16", coeff: "", byte_conv: "ABCD", reg_count: 1, interf_type: "U16", group: "hps", subgroup: "states", readonly: 0, history: 1, interval: 1000, db: "", type_db: "WORD", unit: "", comment: "", data_range: "", device: "" },
  { id: crypto.randomUUID(), prefix: "HPS1_", name: "Isl_Prot_lev", descr_en: "Island Protection Level", descr_ru: "Уровень защиты островного режима", addr: 1, cmd: "REG", type: "U16", coeff: "", byte_conv: "ABCD", reg_count: 1, interf_type: "U16", group: "hps", subgroup: "states", readonly: 0, history: 1, interval: 1000, db: "", type_db: "WORD", unit: "", comment: "", data_range: "", device: "" },
  { id: crypto.randomUUID(), prefix: "HPS1_", name: "Grid", descr_en: "Grid management enable", descr_ru: "Управление сетью доступно", addr: 2, cmd: "REG", type: "U16", coeff: "", byte_conv: "ABCD", reg_count: 1, interf_type: "U16", group: "hps", subgroup: "states", readonly: 0, history: 1, interval: 1000, db: "", type_db: "WORD", unit: "", comment: "", data_range: "", device: "" },
  { id: crypto.randomUUID(), prefix: "HPS1_", name: "GFDI", descr_en: "GFDI enable", descr_ru: "Выключатель датчика замыкания на землю доступен", addr: 3, cmd: "REG", type: "U16", coeff: "", byte_conv: "ABCD", reg_count: 1, interf_type: "U16", group: "hps", subgroup: "states", readonly: 0, history: 1, interval: 1000, db: "", type_db: "WORD", unit: "", comment: "", data_range: "", device: "" },
  { id: crypto.randomUUID(), prefix: "HPS1_", name: "GFCI", descr_en: "GFCI enable", descr_ru: "Выключатель короткого замыкания на землю доступен", addr: 4, cmd: "REG", type: "U16", coeff: "", byte_conv: "ABCD", reg_count: 1, interf_type: "U16", group: "hps", subgroup: "states", readonly: 0, history: 1, interval: 1000, db: "", type_db: "WORD", unit: "", comment: "", data_range: "", device: "" },
]

interface CellProps {
  value: string | number
  onChange: (v: string) => void
  type?: "text" | "number"
  className?: string
  placeholder?: string
}

function EditableCell({ value, onChange, type = "text", className = "", placeholder }: CellProps) {
  return (
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`h-7 text-xs border-0 bg-transparent focus:bg-muted/30 px-1 rounded-none min-w-0 ${className}`}
    />
  )
}

interface SelectCellProps {
  value: string
  onChange: (v: string) => void
  options: string[]
}

function SelectCell({ value, onChange, options }: SelectCellProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-7 text-xs border-0 bg-transparent focus:bg-muted/30 px-1 min-w-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o} className="text-xs">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const COLUMNS = [
  { key: "num", label: "#", width: "w-8" },
  { key: "prefix", label: "Префикс", width: "w-20" },
  { key: "name", label: "Имя переменной", width: "w-32" },
  { key: "descr_en", label: "Описание (EN)", width: "w-40" },
  { key: "descr_ru", label: "Описание (RU)", width: "w-48" },
  { key: "addr", label: "Адрес", width: "w-16" },
  { key: "cmd", label: "Команда", width: "w-20" },
  { key: "type", label: "Тип данных", width: "w-20" },
  { key: "coeff", label: "Множитель", width: "w-20" },
  { key: "byte_conv", label: "Порядок байт", width: "w-24" },
  { key: "reg_count", label: "Кол-во рег.", width: "w-20" },
  { key: "interf_type", label: "Тип на интерфейсе", width: "w-32" },
  { key: "group", label: "Группа", width: "w-20" },
  { key: "subgroup", label: "Подгруппа", width: "w-24" },
  { key: "readonly", label: "Только чтение", width: "w-24" },
  { key: "history", label: "Вести архив", width: "w-20" },
  { key: "interval", label: "Интервал (мс)", width: "w-24" },
  { key: "db", label: "База данных", width: "w-20" },
  { key: "type_db", label: "Тип (для БД)", width: "w-24" },
  { key: "unit", label: "Ед. изм.", width: "w-20" },
  { key: "comment", label: "Примечание", width: "w-32" },
  { key: "data_range", label: "Data Range", width: "w-24" },
  { key: "device", label: "Устройство", width: "w-24" },
  { key: "actions", label: "", width: "w-8" },
]

export function ModbusTableEditor() {
  const [registers, setRegisters] = useState<ModbusRegister[]>(INITIAL_REGISTERS)
  const tableRef = useRef<HTMLDivElement>(null)

  function updateRegister(id: string, field: keyof ModbusRegister, value: string) {
    setRegisters((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        const numFields: (keyof ModbusRegister)[] = ["addr", "reg_count", "readonly", "history", "interval"]
        return { ...r, [field]: numFields.includes(field) ? (value === "" ? "" : Number(value)) : value }
      })
    )
  }

  function addRow() {
    const lastAddr = registers.length > 0
      ? (typeof registers[registers.length - 1].addr === "number" ? (registers[registers.length - 1].addr as number) + 1 : 0)
      : 0
    setRegisters((prev) => [...prev, createEmptyRegister(lastAddr)])
  }

  function deleteRow(id: string) {
    setRegisters((prev) => prev.filter((r) => r.id !== id))
  }

  function exportToExcel() {
    const header1 = ["#", "Имя переменной", "", "Описание", "", "Адрес", "Команда", "Тип данных\n(in datad)", "Множитель", "Порядок чтения байт", "Кол-во регистров в массиве", "Тип данных на интерфейсе", "Группа", "Подгруппа", "Только чтение", "Вести архив", "Интервал записи в БД", "База данных", "Тип (для БД)", "Ед. измерения", "Примечание", "Data Range", "Устройство"]
    const header2 = ["#", "name", "", "descr_en", "descr_ru", "addr", "cmd", "type", "coeff", "byte_conv", "reg_count", "interf_type", "group", "subgroup", "readonly", "history", "interval", "db", "type (db)", "unit", "Comment", "", "device"]

    const rows = registers.map((r, i) => [
      i + 1,
      `${r.prefix}${r.name}`,
      "",
      r.descr_en,
      r.descr_ru,
      r.addr,
      r.cmd,
      r.type,
      r.coeff,
      r.byte_conv,
      r.reg_count,
      r.interf_type,
      r.group,
      r.subgroup,
      r.readonly,
      r.history,
      r.interval,
      r.db,
      r.type_db,
      r.unit,
      r.comment,
      r.data_range,
      r.device,
    ])

    const wsData = [header1, header2, ...rows]
    const ws = XLSX.utils.aoa_to_sheet(wsData)

    ws["!cols"] = [
      { wch: 4 }, { wch: 20 }, { wch: 4 }, { wch: 30 }, { wch: 40 },
      { wch: 8 }, { wch: 8 }, { wch: 12 }, { wch: 10 }, { wch: 14 },
      { wch: 12 }, { wch: 16 }, { wch: 10 }, { wch: 12 }, { wch: 12 },
      { wch: 10 }, { wch: 14 }, { wch: 12 }, { wch: 12 }, { wch: 10 },
      { wch: 14 }, { wch: 14 }, { wch: 12 },
    ]

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Modbus Registers")
    XLSX.writeFile(wb, "modbus_registers.xlsx")
  }

  return (
    <section id="components" className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <AnimatedText
              text="Конструктор карты регистров Modbus"
              variant="heading"
              className="text-3xl font-heading font-bold tracking-tighter sm:text-5xl gradient-text"
              animation="slide"
            />
            <AnimatedText
              text="Заполните таблицу и выгрузите готовый Excel-файл одним кликом"
              variant="paragraph"
              className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400 opacity-70"
              animation="fade"
              delay={0.2}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="rounded-xl border border-border/50 glassmorphic-card overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/20">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs border-red-500/50 text-red-400">
                  {registers.length} регистров
                </Badge>
                <span className="text-xs text-muted-foreground hidden sm:inline">Нажмите на ячейку для редактирования</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addRow}
                  className="h-8 text-xs border-border/50 hover:border-red-500/50"
                >
                  <Icon name="Plus" size={14} className="mr-1" />
                  Добавить строку
                </Button>
                <GradientButton
                  size="sm"
                  onClick={exportToExcel}
                  gradientFrom="from-red-500"
                  gradientTo="to-red-700"
                  className="h-8 text-xs px-4"
                  glowAmount={3}
                >
                  <Icon name="FileSpreadsheet" size={14} className="mr-1" />
                  Скачать Excel
                </GradientButton>
              </div>
            </div>

            {/* Table */}
            <div ref={tableRef} className="overflow-x-auto">
              <table className="w-full text-xs border-collapse min-w-max">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    {COLUMNS.map((col) => (
                      <th
                        key={col.key}
                        className={`${col.width} px-2 py-2 text-left font-medium text-muted-foreground whitespace-nowrap border-r border-border/20 last:border-r-0`}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {registers.map((reg, i) => (
                    <tr
                      key={reg.id}
                      className="border-b border-border/20 hover:bg-muted/10 transition-colors group"
                    >
                      {/* # */}
                      <td className="px-2 py-0.5 text-center text-muted-foreground border-r border-border/20 w-8">
                        {i + 1}
                      </td>
                      {/* prefix */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-20">
                        <EditableCell value={reg.prefix} onChange={(v) => updateRegister(reg.id, "prefix", v)} placeholder="HPS1_" />
                      </td>
                      {/* name */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-32">
                        <EditableCell value={reg.name} onChange={(v) => updateRegister(reg.id, "name", v)} placeholder="Status" />
                      </td>
                      {/* descr_en */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-40">
                        <EditableCell value={reg.descr_en} onChange={(v) => updateRegister(reg.id, "descr_en", v)} placeholder="Description EN" />
                      </td>
                      {/* descr_ru */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-48">
                        <EditableCell value={reg.descr_ru} onChange={(v) => updateRegister(reg.id, "descr_ru", v)} placeholder="Описание RU" />
                      </td>
                      {/* addr */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-16">
                        <EditableCell value={reg.addr} onChange={(v) => updateRegister(reg.id, "addr", v)} type="number" placeholder="0" />
                      </td>
                      {/* cmd */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-20">
                        <SelectCell value={reg.cmd} onChange={(v) => updateRegister(reg.id, "cmd", v)} options={CMD_OPTIONS} />
                      </td>
                      {/* type */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-20">
                        <SelectCell value={reg.type} onChange={(v) => updateRegister(reg.id, "type", v)} options={TYPE_OPTIONS} />
                      </td>
                      {/* coeff */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-20">
                        <EditableCell value={reg.coeff} onChange={(v) => updateRegister(reg.id, "coeff", v)} placeholder="1" />
                      </td>
                      {/* byte_conv */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-24">
                        <SelectCell value={reg.byte_conv} onChange={(v) => updateRegister(reg.id, "byte_conv", v)} options={BYTE_CONV_OPTIONS} />
                      </td>
                      {/* reg_count */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-20">
                        <EditableCell value={reg.reg_count} onChange={(v) => updateRegister(reg.id, "reg_count", v)} type="number" placeholder="1" />
                      </td>
                      {/* interf_type */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-32">
                        <SelectCell value={reg.interf_type} onChange={(v) => updateRegister(reg.id, "interf_type", v)} options={INTERF_TYPE_OPTIONS} />
                      </td>
                      {/* group */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-20">
                        <EditableCell value={reg.group} onChange={(v) => updateRegister(reg.id, "group", v)} placeholder="hps" />
                      </td>
                      {/* subgroup */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-24">
                        <EditableCell value={reg.subgroup} onChange={(v) => updateRegister(reg.id, "subgroup", v)} placeholder="states" />
                      </td>
                      {/* readonly */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-24">
                        <SelectCell
                          value={String(reg.readonly)}
                          onChange={(v) => updateRegister(reg.id, "readonly", v)}
                          options={["0", "1"]}
                        />
                      </td>
                      {/* history */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-20">
                        <SelectCell
                          value={String(reg.history)}
                          onChange={(v) => updateRegister(reg.id, "history", v)}
                          options={["0", "1"]}
                        />
                      </td>
                      {/* interval */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-24">
                        <EditableCell value={reg.interval} onChange={(v) => updateRegister(reg.id, "interval", v)} type="number" placeholder="1000" />
                      </td>
                      {/* db */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-20">
                        <EditableCell value={reg.db} onChange={(v) => updateRegister(reg.id, "db", v)} placeholder="" />
                      </td>
                      {/* type_db */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-24">
                        <SelectCell value={reg.type_db} onChange={(v) => updateRegister(reg.id, "type_db", v)} options={TYPE_DB_OPTIONS} />
                      </td>
                      {/* unit */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-20">
                        <EditableCell value={reg.unit} onChange={(v) => updateRegister(reg.id, "unit", v)} placeholder="В" />
                      </td>
                      {/* comment */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-32">
                        <EditableCell value={reg.comment} onChange={(v) => updateRegister(reg.id, "comment", v)} placeholder="" />
                      </td>
                      {/* data_range */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-24">
                        <EditableCell value={reg.data_range} onChange={(v) => updateRegister(reg.id, "data_range", v)} placeholder="0..65535" />
                      </td>
                      {/* device */}
                      <td className="px-0 py-0.5 border-r border-border/20 w-24">
                        <EditableCell value={reg.device} onChange={(v) => updateRegister(reg.id, "device", v)} placeholder="" />
                      </td>
                      {/* delete */}
                      <td className="px-1 py-0.5 w-8">
                        <button
                          onClick={() => deleteRow(reg.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-400 p-1 rounded"
                        >
                          <Icon name="Trash2" size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {registers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                  <Icon name="Table" size={40} className="mb-3 opacity-30" />
                  <p className="text-sm">Таблица пустая — добавьте первый регистр</p>
                  <Button variant="outline" size="sm" onClick={addRow} className="mt-4">
                    <Icon name="Plus" size={14} className="mr-1" />
                    Добавить регистр
                  </Button>
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-border/30 bg-muted/10 flex items-center justify-between">
              <span className="text-xs text-muted-foreground opacity-60">
                Данные хранятся локально в браузере
              </span>
              <span className="text-xs text-muted-foreground opacity-60">
                Прокрутите таблицу вправо, чтобы увидеть все колонки →
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
