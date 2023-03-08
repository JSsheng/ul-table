```json
{
  "swagger": "2.0",
  "info": {
    "title": "inbox_rpc.proto",
    "version": "version not set"
  },
  "tags": [
    {
      "name": "InBoxSrv"
    }
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/api/v1/report/projs": {
      "post": {
        "operationId": "InBoxSrv_GetProject",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/ntpbGetProjectsRsp"
            }
          },
          "default": {
            "description": "An unexpected error response.",
            "schema": {
              "$ref": "#/definitions/rpcStatus"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ntpbGetProjectsReq"
            }
          }
        ],
        "tags": [
          "InBoxSrv"
        ]
      }
    },
    "/api/v1/report/projs/{projName}": {
      "post": {
        "operationId": "InBoxSrv_GetProjectReport",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/ntpbGetProjectReportRsp"
            }
          },
          "default": {
            "description": "An unexpected error response.",
            "schema": {
              "$ref": "#/definitions/rpcStatus"
            }
          }
        },
        "parameters": [
          {
            "name": "projName",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "type": "object"
            }
          }
        ],
        "tags": [
          "InBoxSrv"
        ]
      }
    },
    "/api/v1/stinstpl/del": {
      "post": {
        "operationId": "InBoxSrv_DelStInsTpl",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/ntpbDelStInsTplRsp"
            }
          },
          "default": {
            "description": "An unexpected error response.",
            "schema": {
              "$ref": "#/definitions/rpcStatus"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ntpbDelStInsTplReq"
            }
          }
        ],
        "tags": [
          "InBoxSrv"
        ]
      }
    },
    "/api/v1/stinstpl/get": {
      "post": {
        "operationId": "InBoxSrv_GetStInsTpl",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/ntpbGetStInsTplRsp"
            }
          },
          "default": {
            "description": "An unexpected error response.",
            "schema": {
              "$ref": "#/definitions/rpcStatus"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ntpbGetStInsTplReq"
            }
          }
        ],
        "tags": [
          "InBoxSrv"
        ]
      }
    },
    "/api/v1/stinstpl/new": {
      "post": {
        "operationId": "InBoxSrv_NewStInsTpl",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/ntpbNewStInsTplRsp"
            }
          },
          "default": {
            "description": "An unexpected error response.",
            "schema": {
              "$ref": "#/definitions/rpcStatus"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ntpbNewStInsTplReq"
            }
          }
        ],
        "tags": [
          "InBoxSrv"
        ]
      }
    },
    "/api/v1/stinstpl/set": {
      "post": {
        "operationId": "InBoxSrv_SetStInsTpl",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/ntpbSetStInsTplRsp"
            }
          },
          "default": {
            "description": "An unexpected error response.",
            "schema": {
              "$ref": "#/definitions/rpcStatus"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ntpbSetStInsTplReq"
            }
          }
        ],
        "tags": [
          "InBoxSrv"
        ]
      }
    },
    "/api/v1/subitems/get": {
      "post": {
        "operationId": "InBoxSrv_GetSubItems",
        "responses": {
          "200": {
            "description": "A successful response.",
            "schema": {
              "$ref": "#/definitions/ntpbGetSubItemsRsp"
            }
          },
          "default": {
            "description": "An unexpected error response.",
            "schema": {
              "$ref": "#/definitions/rpcStatus"
            }
          }
        },
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/ntpbGetSubItemsReq"
            }
          }
        ],
        "tags": [
          "InBoxSrv"
        ]
      }
    }
  },
  "definitions": {
    "ntpbDelStInsTplReq": {
      "type": "object",
      "properties": {
        "item": {
          "type": "string"
        }
      }
    },
    "ntpbDelStInsTplRsp": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        }
      }
    },
    "ntpbGetProjectReportRsp": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "$ref": "#/definitions/ntpbProjectReport"
        }
      }
    },
    "ntpbGetProjectsReq": {
      "type": "object",
      "properties": {
        "projRe": {
          "type": "string",
          "title": "use \"*\""
        }
      }
    },
    "ntpbGetProjectsRsp": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ntpbProject"
          }
        }
      }
    },
    "ntpbGetStInsTplReq": {
      "type": "object",
      "properties": {
        "tplName": {
          "type": "string",
          "description": "* 表示所有."
        },
        "sn": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "ntpbGetStInsTplRsp": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "type": "object",
          "additionalProperties": {
            "$ref": "#/definitions/ntpbStInsTpl"
          }
        }
      }
    },
    "ntpbGetSubItemsReq": {
      "type": "object",
      "properties": {
        "itemPath": {
          "type": "string"
        },
        "sn": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "ntpbGetSubItemsRsp": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "type": "object",
          "additionalProperties": {
            "type": "string"
          }
        },
        "sn": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "ntpbNewStInsTplReq": {
      "type": "object",
      "properties": {
        "TplName": {
          "type": "string"
        },
        "des": {
          "type": "string"
        },
        "sn": {
          "type": "integer",
          "format": "int32"
        }
      }
    },
    "ntpbNewStInsTplRsp": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "$ref": "#/definitions/ntpbStInsTpl"
        }
      }
    },
    "ntpbProject": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "title": {
          "type": "string"
        }
      }
    },
    "ntpbProjectReport": {
      "type": "object",
      "properties": {
        "projName": {
          "type": "string"
        },
        "reports": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ntpbReportDay"
          }
        }
      }
    },
    "ntpbReportDay": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string"
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ntpbReportItem"
          }
        }
      }
    },
    "ntpbReportItem": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      }
    },
    "ntpbSetStInsTplReq": {
      "type": "object",
      "properties": {
        "item": {
          "$ref": "#/definitions/ntpbStInsTpl"
        }
      }
    },
    "ntpbSetStInsTplRsp": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "$ref": "#/definitions/ntpbStInsTpl"
        }
      }
    },
    "ntpbStInsTpl": {
      "type": "object",
      "properties": {
        "TplName": {
          "type": "string"
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/ntpbStInsTplItem"
          }
        },
        "des": {
          "type": "string"
        }
      }
    },
    "ntpbStInsTplItem": {
      "type": "object",
      "properties": {
        "jsonField": {
          "type": "string"
        },
        "kind": {
          "type": "string"
        },
        "stAttr": {
          "type": "string",
          "description": "Meaningful name."
        },
        "show": {
          "type": "boolean"
        },
        "des": {
          "type": "string",
          "description": "Describe the meaning and type of this property."
        }
      }
    },
    "protobufAny": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string"
        }
      },
      "additionalProperties": {}
    },
    "rpcStatus": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        },
        "details": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/protobufAny"
          }
        }
      }
    }
  }
}
```

