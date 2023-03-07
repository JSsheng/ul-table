import AgLink from "../../components/AgLink/index.vue";
import i18n from '../../lang/index'

export const config = [
  {
    // https://github.com/intlify/vue-i18n-next/issues/904
    headerName: i18n.global.t('reportCellName'), 
    field: "date",
    flex: 1
  },
  { 
    headerName: "prjx", 
    field: "items",
    cellRenderer: AgLink,
    autoHeight: true,
    flex: 1
  }
]