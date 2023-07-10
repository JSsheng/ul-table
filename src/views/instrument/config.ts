export const config = {
  "account": [
    {
      headerName: "AccIns",
      field: "accIns",
      minWidth: 140,
      sortable:true,
      filter: true
    }, {
      headerName: "Automation",
      field: "automation",
      sortable:true,
      filter: true
    }, {
      headerName: "Leverage",
      field: "leverage",
      sortable:true,
      filter: true
    }, {
      headerName: "MaxNotional",
      field: "maxNotional",
      sortable:true,
      filter: true
    }, {
      headerName: "MaxBorrow",
      field: "maxBorrow",
      sortable:true,
      filter: true
    }, {
      headerName: "BorrowRate",
      field: "borrowRate",
      sortable:true,
      filter: true,
      flex: 1
    }
  ],
  "base": [
    {
      headerName: "Ins",
      field: "ins",
      minWidth: 140,
      sortable:true,
      filter: true
    }, {
      headerName: "Exchange",
      field: "exchange",
      sortable:true,
      filter: true
    }, {
      headerName: "Kind",
      field: "kind",
      sortable:true,
      filter: true
    }, {
      headerName: "BaseCurrency",
      field: "baseCurrency",
      sortable:true,
      filter: true
    }, {
      headerName: "QuoteCurrency",
      field: "quoteCurrency",
      sortable:true,
      filter: true
    },
    {
      headerName: "SettlementCurrency",
      field: "settlementCurrency",
      sortable:true,
      filter: true
    },
    {
      headerName: "ContractMultiplier",
      field: "contractMultiplier",
      sortable:true,
      filter: true
    },
    {
      headerName: "PriceTick",
      field: "priceTick",
      sortable:true,
      filter: true
    }, {
      headerName: "VolumeTick",
      field: "volumeTick",
      sortable:true,
      filter: true
    }, {
      headerName: "MinTradeUsd",
      field: "minTradeUsd",
      sortable:true,
      filter: true
    }, {
      headerName: "Model",
      field: "model",
      sortable:true,
      filter: true
    }, {
      headerName: "Expiry",
      field: "expiry",
      sortable:true,
      filter: true
    }, {
      headerName: "OptionType",
      field: "optionType",
      sortable:true,
      filter: true
    },{
      headerName: "OptionStrike",
      field: "optionStrike",
      sortable:true,
      filter: true
    },{
      headerName: "Automation",
      field: "automation",
      sortable:true,
      filter: true
    }, {
      headerName: "PreSettlementPrice",
      field: "preSettlementPrice",
      sortable:true,
      filter: true
    }, {
      headerName: "ActiveFlag",
      field: "activeFlag",
      sortable:true,
      filter: true
    }
  ]
}

export const defaultColDef = {
  editable: true
}
