import { AfterViewInit, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { field, value, value1 } from '../../../../../global.model';
import { AlertService } from '../../../../../services/alert.service';
import { WireframeLineService } from '../../../../../services/builder/wireframe-line.service';
// import { AfterViewInit, NgZone } from '@angular/core';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValueTransformer } from '@angular/compiler/src/util';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { HttpHeaderResponse } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-update-wireframe',
  templateUrl: './update-wireframe.component.html',
  styleUrls: ['./update-wireframe.component.scss']
})
export class UpdateWireframeComponent implements OnInit, AfterViewInit {

  Editor = ClassicEditor;
  @Input() readonly: boolean = false;
  // public EditorText: string = "Hello!";
  @ViewChild("myEditor") myEditor: any;
  //public Editor = Editor;
  public Config = {
    placeholder: "Type the content here!"
  };
  value: value = {
    label: "",
    value: ""
  };
  value1: value1 = {
    label1: "",
    value1: ""
  };


  oneLine: any;
  success = false;
  id: any;
  i1: any;
  div_name_map = new Map();
  new_model: any = [];
  div_coll = new Map();
  tr_map = new Map();
  sub_div: any = [];

  visibiltyOpt = ["Everyone", "Individual"];
  sessionVarOpt = ["session", "session1"];
  allowedDaysOpt = [1, 2, 3, 4];
  allowedHrsToOpt = [1, 2, 3, 4];
  allowedHrsFromOpt = [1, 2, 3, 4];
  datePickerOpt = ["Default", "Default1"];
  textFieldStyle: boolean = false;
  fieldLayoutOpt = ["Single Column", "Double Column"];
  dynamicListOpt = ["list1", "list2", "list3"];
  defaultCameraOpt = ["Primary", "Secondary"];
  targetOpt = ["New Window", "New Tab"];
  currencyTypeOpt = ["USD", "Doller", "Rupee"];
  formatNoOpt = ["1,234,567.89", "1,23,577.87"];
  providersOpt = ["Custom", "Google Maps", "Azure Maps", "OpenStreetMap Nomination"];
  themeOpt = ["Default", "Primary", "Info", "Success", "Danger", "Warning"];

  handleChange(i, val, modalAttributes) {
    if (val == '1a-' + i)
      modalAttributes.size = 'w-100';
    else if (val == '1b-' + i)
      modalAttributes.size = 'w-50';
    else if (val == '1c-' + i)
      modalAttributes.size = 'w-33';
    else if (val == '1d-' + i)
      modalAttributes.size = 'w-25';
  }
  fieldModels: Array<field> = [
    {
      name: "Basic",
      expanded: true,
      files: [
        {
          "type": "text",
          "icon": "bi-type",
          "required": false,
          "datatype": "String",
          "label": "Text",
          "description": "Enter your name",
          "placeholder": "Enter your name",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "email",
          "icon": "bi-envelope",
          "datatype": "String",
          "required": false,
          "label": "Email",
          "description": "Enter your email",
          "placeholder": "Enter your email",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "", //^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$
          "errorText": "Please enter a valid email",
          "div_name": "",
          "gridLine_name": "",
          "handle": true,
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "password",
          "label": "Password",
          "password": "",
          "icon": "bi-asterisk",
          "datatype": "String",
          "description": "password",
          "placeholder": "Enter your password",
          "className": "form-control",
          "value": "20",
          "size": 'w-25',
          "min": 12,
          "div_name": "",
          "gridLine_name": "",
          "max": 90,
          "duplicateVal": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "phone",
          "icon": "bi-telephone",
          "datatype": "Integer",
          "label": "Phone",
          "description": "Enter your phone",
          "placeholder": "Enter your phone",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "", //^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$
          "errorText": "Please enter a valid phone number",
          "div_name": "",
          "gridLine_name": "",
          "handle": true,
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "personalInfo": false,
          "showDescription": false,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "number",
          "label": "Number",
          "icon": "bi-123",
          "datatype": "Integer",
          "description": "Age",
          "placeholder": "Enter your age",
          "className": "form-control",
          "value": "20",
          "size": 'w-25',
          "min": 12,
          "div_name": "",
          "gridLine_name": "",
          "max": 90,
          "duplicateVal": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "iconType": "basic",
          "type": "date",
          "icon": "bi-calendar4",
          "datatype": "Date",
          "label": "Date",
          "size": 'w-25',
          "placeholder": "Date",
          "div_name": "",
          "gridLine_name": "",
          "className": "form-control",
          "readOnly": false,
          "sessionVar": "",
          "allowedDays": "",
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "Datetime",
          "icon": "bi-clock",
          "datatype": "LocalDateTime",
          "label": "DateTime",
          "size": 'w-25',
          "placeholder": "Date Time",
          "div_name": "",
          "gridLine_name": "",
          "className": "form-control",
          "allowedHrsFrom": "",
          "allowedHrsTo": "",
          "showSeconds": false,
          "datePicker": "",
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "textarea",
          "icon": "bi-textarea-resize",
          "datatype": "String",
          "size": 'w-50',
          "div_name": "",
          "gridLine_name": "",
          "label": "Textarea",
          "encryptData": false,
          "personalHealthInfo": false,
          "descriptionText": "",
          "heightpx": "100",
          "showDescription": false,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "paragraph",
          "icon": "bi-text-left",
          "datatype": "String",
          "label": "Paragraph",
          "size": 'w-25',
          "div_name": "",
          "gridLine_name": "",
          "placeholder": "Type your text to display here only",
          "encryptData": false,
          "personalHealthInfo": false,
          "descriptionText": "",
        },
        {
          "type": "Section",
          "icon": "bi-text-left",
          "datatype": "String",
          "label": "Section",
          "size": 'w-25',
          "div_name": "",
          "gridLine_name": "",
          "placeholder": "Section Name"
        },
        {
          "type": "Division",
          "icon": "bi-text-center",
          "datatype": "String",
          "label": "Division",
          "size": 'w-100',
          "div_name": "",
          "gridLine_name": "",
          "placeholder": "Division Name",
          children: []
        },
        {
          "type": "Grid Lines",
          "icon": "bi-text-center",
          "datatype": "String",
          "label": "Grid Lines",
          "size": 'w-100',
          "div_name": "",
          "gridLine_name": "",
          "placeholder": "Grid Lines Name",
          children: []
        },
        {
          "type": "checkbox",
          "required": false,
          "label": "Checkbox",
          "icon": "bi-check2-square",
          "datatype": "Boolean",
          "size": 'w-50',
          "description": "Checkbox",
          "inline": true,
          "div_name": "",
          "gridLine_name": "",
          "alphabeticalOrdering": false,
          "values": [
            {
              "label": "Option 1",
              "value": "option-1"
            },
            {
              "label": "Option 2",
              "value": "option-2"
            }
          ]
        },
        {
          "type": "radio",
          "required": false,
          "icon": "bi-ui-radios",
          "datatype": "Boolean",
          "label": "Radio",
          "size": 'w-50',
          "description": "Radio boxes",
          "div_name": "",
          "gridLine_name": "",
          "fieldLayout": "",
          "alphabeticalOrdering": false,
          "otherChoice": false,
          "personalHealthInfo": false,
          "values": [
            {
              "label": "Option 1",
              "value": "option-1"
            },
            {
              "label": "Option 2",
              "value": "option-2"
            }
          ]
        },
        {
          "type": "autocomplete",
          "icon": "bi-menu-button",
          "datatype": "String",
          "label": "Select",
          "description": "Select",
          "placeholder": "Select",
          "size": 'w-25',
          "className": "form-control",
          "div_name": "",
          "gridLine_name": "",
          "readOnly": false,
          "duplicateVal": "",
          "sessionVar": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "dynamicList": "",
          "alphabeticalOrdering": false,
          "otherChoice": false,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "file",
          "icon": "bi-upload",
          "datatype": "String",
          "label": "File Upload",
          "className": "form-control",
          "size": 'w-25',
          "subtype": "file",
          "div_name": "",
          "gridLine_name": "",
          "duplicateVal": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "values": [
            {
              "label": "Local machine",
              "value": "local-machine"
            },
            {
              "label": "sureDrive",
              "value": "sure-drive"
            },
            {
              "label": "Google Drive",
              "value": "google-drive"
            }
          ]
        },
        {
          "type": "button",
          "required": false,
          "icon": "bi-cursor",
          "datatype": "String",
          "subtype": "submit",
          "size": 'w-25',
          "label": "Button",
          "div_name": "",
          "gridLine_name": "",
          "actiontype": "",
          "entity1": "",
          "entity2": "",
          "entity3": "",
          "endpoint1": "",
          "endpoint2": "",
          "endpoint3": "",
          "body1": "",
          "body2": "",
          "body3": "",
          "condition_to_show": "",
          "condition_to_hide": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "autocomplete",
          "icon": "bi-input-cursor-text",
          "datatype": "String",
          "label": "Autocomplete",
          "description": "autocomplete",
          "size": 'w-25',
          "placeholder": "autocomplete",
          "className": "form-control",
          "div_name": "",
          "gridLine_name": "",
          "readOnly": false,
          "duplicateVal": "",
          "sessionVar": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "dynamicList": "",
          "alphabeticalOrdering": false,
          "otherChoice": false,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "submit",
          "required": false,
          //"title": "child-form",
          "icon": "bi-menu-button-wide",
          "datatype": "String",
          "subtype": "child-form",
          "size": 'w-25',
          "label": "FormButton",
          "toWireframe":"",
          "descriptionText": "",
        },
      ]
    },
    {
      name: "Advanced",
      expanded: false,
      files: [
        {
          "type": "multiselect",
          "required": false,
          "icon": "bi-list-check",
          "datatype": "String",
          "label": "Multiselect",
          "description": "Enter your name",
          "placeholder": "Enter your name",
          "className": "form-control",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "sessionVar": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "dynamicList": "",
          "alphabeticalOrdering": false,
          "otherChoice": false,
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "survey",
          "icon": "bi-list-task",
          "datatype": "String",
          "label": "Survey",
          "description": "Enter your name",
          "placeholder": "Enter your name",
          "className": "form-control",
          "size": 'w-100',
          "regex": "",
          "div_name": "",
          "descriptionText": "",
          "dynamicList": "",
          "gridLine_name": "",
          "handle": true,
          "questions": [
            {
              "label1": " ",
              "value1": " "
            }
          ],
          "values": [
            {
              "label": " ",
              "value": " "
            }
          ]
        },
        {
          "type": "tags",
          "icon": "bi-tag",
          "datatype": "String",
          "label": "Tags",
          "description": "Enter your name",
          "placeholder": "Enter your name",
          "className": "form-control",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "sessionVar": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "dynamicList": "",
          "alphabeticalOrdering": false,
          "otherChoice": false,
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "address",
          "icon": "bi-house-door",
          "datatype": "String",
          "label": "Address",
          "description": "Enter your name",
          "placeholder": "Enter your name",
          "className": "form-control",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "sessionVar": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "providersData": "",
          "apikey": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "dynamicList": "",
          "alphabeticalOrdering": false,
          "otherChoice": false,
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },

        {
          "type": "image",
          "required": false,
          "icon": "bi-image",
          "datatype": "Blob",
          "label": "Image",
          "className": "form-control",
          "size": 'w-25',
          "div_name": "",
          "gridLine_name": "",
          "duplicateVal": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "target": "",
          "defaultCamera": "",
          "values": [
            {
              "label": "browse/gallery",
              "value": "browse-gallery"
            },
            {
              "label": "sureDrive",
              "value": "sure-drive"
            },
            {
              "label": "Google Drive",
              "value": "google-drive"
            },
            {
              "label": "Device Camera",
              "value": "device-camera"
            },
            {
              "label": "Link",
              "value": "link"
            }
          ],
          "imgoption": [
            {
              "label": "Title",
              "value": "title"
            },
            {
              "label": "Url",
              "value": "url"
            }
          ]
        },
        {
          "type": "audio",
          "required": false,
          "icon": "bi-file-music",
          "datatype": "String",
          "label": "Audio",
          "className": "form-control",
          "size": 'w-25',
          "div_name": "",
          "gridLine_name": "",
          "duplicateVal": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "target": "",
          "maxDuration": "",
          "values": [
            {
              "label": "browse/gallery",
              "value": "browse-gallery"
            },
            {
              "label": "sureDrive",
              "value": "sure-drive"
            },
            {
              "label": "Google Drive",
              "value": "google-drive"
            },
            {
              "label": "Device Camera",
              "value": "device-camera"
            },
            {
              "label": "Link",
              "value": "link"
            }
          ]
        },
        {
          "type": "video",
          "icon": "bi-camera-video",
          "datatype": "String",
          "label": "Video",
          "className": "form-control",
          "size": 'w-25',
          "div_name": "",
          "gridLine_name": "",
          "duplicateVal": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "target": "",
          "maxDuration": "",
          "values": [
            {
              "label": "browse/gallery",
              "value": "browse-gallery"
            },
            {
              "label": "sureDrive",
              "value": "sure-drive"
            },
            {
              "label": "Google Drive",
              "value": "google-drive"
            },
            {
              "label": "Device Camera",
              "value": "device-camera"
            },
            {
              "label": "Link",
              "value": "link"
            }
          ]
        },
        {
          "type": "signature",
          "icon": "bi-pen",
          "datatype": "String",
          "label": "Signature",
          "className": "form-control",
          "size": 'w-25',
          "div_name": "",
          "gridLine_name": "",
          "duplicateVal": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "heightpx": "100",
          "values": [
            {
              "label": "browse/gallery",
              "value": "browse-gallery"
            },
            {
              "label": "sureDrive",
              "value": "sure-drive"
            },
            {
              "label": "Google Drive",
              "value": "google-drive"
            },
            {
              "label": "Device Camera",
              "value": "device-camera"
            },
            {
              "label": "Link",
              "value": "link"
            }
          ]
        },
        {
          "type": "url",
          "icon": "bi-globe",
          "datatype": "String",
          "required": false,
          "label": "URL",
          "className": "form-control",
          "size": 'w-25',
          "div_name": "",
          "gridLine_name": "",
          "duplicateVal": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "target": "",
          "defaultCamera": "",
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ],
          "imgoption": [
            {
              "label": "Link Name",
              "value": "link-name"
            },
            {
              "label": "Title",
              "value": "title"
            }
          ]
        },
        {
          "type": "percent",
          "icon": "bi-percent",
          "datatype": "Integer",
          "required": false,
          "label": "Percent",
          "className": "form-control",
          "size": 'w-25',
          "div_name": "",
          "gridLine_name": "",
          "duplicateVal": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "maxNo": 10,
          "decimalPlaces": 2,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "decimal",
          "icon": "bi-123",
          "datatype": "String",
          "required": false,
          "label": "Decimal",
          "className": "form-control",
          "size": 'w-25',
          "div_name": "",
          "gridLine_name": "",
          "duplicateVal": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "maxNo": 10,
          "decimalPlaces": 2,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "currency",
          "icon": "bi-currency-dollar",
          "datatype": "String",
          "required": false,
          "label": "Currency",
          "className": "form-control",
          "size": 'w-25',
          "div_name": "",
          "gridLine_name": "",
          "duplicateVal": "",
          "tooltipmsg": "",
          "visibilty": "",
          "personalInfo": false,
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "showDescription": false,
          "maxNo": 10,
          "decimalPlaces": 2,
          "currencyType": "",
          "formatNo": "",
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
      ]
    },
    {
      name: "Layout",
      expanded: false,
      files: [
        {
          "type": "htmlelement",
          "icon": "bi-filetype-html",
          "datatype": "String",
          //"required": true,
          "label": "HTML Element",
          "description": "Enter HTML content",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "content": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "Content",
          "icon": "bi-file-earmark-code",
          "datatype": "String",
          //"required": true,
          "label": "Content",
          "description": "Enter Content",
          "placeholder": "Enter Placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "editordata": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "columns",
          "icon": "bi-layout-split",
          "datatype": "String",
          //"required": true,
          "label": "Columns",
          "description": "Enter your name",
          "placeholder": "Enter your name",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-100',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "values": [
            {
              "value": 6
            },
            {
              "value": 6
            }
          ],
          children: []
        },
        {
          "type": "fieldset",
          "icon": "bi-grid",
          "datatype": "String",
          //"required": true,
          "label": "Field Set",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "panel",
          "icon": "bi-card-list",
          "datatype": "String",
          //"required": true,
          "label": "Panel",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-100',
          "regex": "",
          "div_name": "",
          "theme": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ],
          children: []
        },
        {
          "type": "table",
          "icon": "bi-table",
          "datatype": "String",
          //"required": true,
          "label": "Table",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-100',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "norows": "",
          "nocolumns": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ],
          children: []
        },
        {
          "type": "tab",
          "icon": "bi-folder",
          "datatype": "String",
          //"required": true,
          "label": "Tab",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-100',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "tab1",
              "value": "tab 1"
            }
          ],
          children: []
        },
        {
          "type": "well",
          "icon": "bi-square",
          "datatype": "String",
          //"required": true,
          "label": "Well",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
      ]
    },
    {
      name: "Data",
      expanded: false,
      files: [
        {
          "type": "hidden",
          "icon": "bi-shield-check",
          "datatype": "String",
          //"required": true,
          "label": "Hidden",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "maxcharacters": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "container",
          "icon": "bi-folder2-open",
          "datatype": "String",
          //"required": true,
          "label": "Container",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "datamap",
          "icon": "bi-card-list",
          "datatype": "String",
          //"required": true,
          "label": "Data Map",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "datagrid",
          "icon": "bi-grid-3x3-gap",
          "datatype": "String",
          //"required": true,
          "label": "Data Grid",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "editgrid",
          "icon": "bi-pencil-square",
          "datatype": "String",
          //"required": true,
          "label": "Edit Grid",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "tree",
          "icon": "bi-text-indent-left",
          "datatype": "String",
          //"required": true,
          "label": "Tree",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
      ]
    },
    {
      name: "Premium",
      expanded: false,
      files: [
        {
          "type": "recaptcha",
          "icon": "bi-arrow-repeat",
          "datatype": "String",
          //"required": true,
          "label": "Recaptcha",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "resource",
          "icon": "bi-files",
          "datatype": "String",
          //"required": true,
          "label": "Resource",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },

        {
          "type": "nestedform",
          "icon": "bi-files-alt",
          "datatype": "String",
          "required": false,
          "label": "Nested Forms",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
        {
          "type": "custom",
          "icon": "bi-boxes",
          "datatype": "String",
          //"required": true,
          "label": "Custom",
          "description": "Enter Description",
          "placeholder": "Enter placeholder",
          "className": "form-control",
          "subtype": "text",
          "size": 'w-25',
          "regex": "",
          "div_name": "",
          "tooltipmsg": "",
          "visibilty": "",
          "duplicateVal": "",
          "encryptData": "",
          "personalHealthInfo": false,
          "descriptionText": "",
          "gridLine_name": "",
          "handle": true,
          "values": [
            {
              "label": "QR Code",
              "value": "qr-code"
            },
            {
              "label": "Bar Code",
              "value": "bar-code"
            }
          ]
        },
      ]
    },
  ];
  modelFields: Array<field> = [];
  model: any = {
    name: 'FormName',
    description: 'Form Description...',
    theme: {

      bannerImage: ""
    },
    attributes: this.modelFields
  };
  modal = false;
  modal2 = false;
  modal3 = false;
  report = false;
  reports: any = [];
  show: any;
  projectId;

  wfline = {
    header_id: '100',
    model: ''
  }
  formBuilder: any;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private _route: ActivatedRoute,
    private alertService: AlertService,
    private toastr: ToastrService,
    private _line: WireframeLineService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.projectId = +params['p_id'];
      console.log("projectId: " + this.projectId);
    });
    this.id = this._route.snapshot.params.id;

    this._line.getAllLines().subscribe(
      (data: any) => {
        for (let val of data) {
          if (val.header_id == this.id) {
            this.wflineget = val;
            this.model = JSON.parse(val.model);
          }

        }
        // console.log(this.wflineget);
        console.log(this.model);

      },
      (error: any) => {

      }
    );
    this.copy_value();

    this.getallwireframe();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {


      // this.ngZone.runOutsideAngular(() => {
      //   //$(document.getElementById('fb-editor')).formBuilder();
      //   var fbEditor = document.getElementById('fb-editor');
      //   this.formBuilder = $(fbEditor).formBuilder();
      // });

    }, 2000)


  }
  wflineget = {
    id: '',
    header_id: '',
    model: ''
  }

  ColumnChange(value: string) {
    switch (value) {
      case "fourCol":
        console.log(this.model.attributes);
        for (let i = 0; i < this.model.attributes.length; i++) {
          if (this.model.attributes[i].size == 'w-100' || this.model.attributes[i].size == 'w-50' || this.model.attributes[i].size == 'w-33') {
            if (!(this.model.attributes[i].type == "textarea" || this.model.attributes[i].type == "paragraph" || this.model.attributes[i].type == "radio" || this.model.attributes[i].type == "file" || this.model.attributes[i].type == "button"))
           this.model.attributes[i].size = 'w-25'

          }
        }
        break;
      case "threeCol":
        console.log(this.model.attributes);
        for (let i = 0; i < this.model.attributes.length; i++) {
          if (this.model.attributes[i].size == 'w-100' || this.model.attributes[i].size == 'w-50' || this.model.attributes[i].size == 'w-25') {
            if (!(this.model.attributes[i].type == "textarea" || this.model.attributes[i].type == "paragraph" || this.model.attributes[i].type == "radio" || this.model.attributes[i].type == "file" || this.model.attributes[i].type == "button"))
              this.model.attributes[i].size = 'w-33'
          }
        }
        break;
      case "twoCol":
        console.log(this.model.attributes);
        for (let i = 0; i <this.model.attributes.length; i++) {
          if (this.model.attributes[i].size == 'w-25' || this.model.attributes[i].size == 'w-33' || this.model.attributes[i].size == 'w-25'){
            if (!(this.model.attributes[i].type == "textarea" || this.model.attributes[i].type == "paragraph" || this.model.attributes[i].type == "radio" || this.model.attributes[i].type == "file" || this.model.attributes[i].type == "button"))
              this.model.attributes[i].size = 'w-50'
          }
        }
        break;
      case "oneCol":
        console.log(this.model.attributes);
        for (let i = 0; i < this.model.attributes.length; i++) {
          if (this.model.attributes[i].size == 'w-33' || this.model.attributes[i].size == 'w-50' || this.model.attributes[i].size == 'w-25') {
            if (!(this.model.attributes[i].type == "textarea" || this.model.attributes[i].type == "paragraph" || this.model.attributes[i].type == "radio" || this.model.attributes[i].type == "file" || this.model.attributes[i].type == "button"))
              this.model.attributes[i].size = 'w-100'
          }
        }
        break;
    }
  }

  optimize() {
    console.log(this.model.attributes);
    for (let i = 0; i < this.model.attributes.length; i++) {
      if (this.model.attributes[i].size == 'w-100') {
        if (!(this.model.attributes[i].type == "textarea" || this.model.attributes[i].type == "paragraph" || this.model.attributes[i].type == "radio" || this.model.attributes[i].type == "file" || this.model.attributes[i].type == "button"))
          this.model.attributes[i].size = 'w-25'
      }

    }
    console.log(this.model.attributes)
    //this.updateModal();
  }


  // surveyData()
  // {
  //   this.wflineget.model = JSON.stringify(this.model);
  //   console.log(this.wflineget.model);
  //   console.log(this.model);
  // }

  updateModal() {
    this.wflineget.header_id = this.id;
    this.wflineget.model = JSON.stringify(this.model);
    this._line.updateOneLine(this.wflineget).subscribe(
      (data: any) => {
        console.log('Updation Successful...');
        console.log(data);
        this.ngOnInit();
        this.modal = false;
        this.router.navigate(["../../../../../wireframe"], { relativeTo: this.route })
        // this.router.navigate(["../../../../wireframe"], { relativeTo: this._route });
      }
    );
    if (this.id) {
      this.toastr.success('Updated successfully');
    }
  }
  copy_value() {
    let header_gridline_name: any = [];
    let header_gridline_name_data: any = [];
    let j1 = 0
    this.div_coll.clear();
    this.new_model = [];
    for (let i = 0; i < this.model.attributes.length; i++) {
      this.new_model[j1++] = this.model.attributes[i];
      if (this.model.attributes[i].type == 'Division') {
        i++;
        let j = i;
        let k = 0;
        this.sub_div = [];
        for (; j < this.model.attributes.length; j++) {
          if (this.model.attributes[i].type == 'Grid Lines') {
            this.div_coll.set(j1 - 1, this.sub_div);
            i--;
            break;
          }
          if (this.model.attributes[j].type == 'Division') {
            this.div_coll.set(j1 - 1, this.sub_div);
            i--;
            break;
          }
          this.sub_div[k++] = this.model.attributes[j];
          i++;
        }
        if (j == this.model.attributes.length) {
          this.div_coll.set(j1 - 1, this.sub_div);
          break;
        }
      }
      if (this.model.attributes[i].type == 'Grid Lines') {
        i++;
        let ind = 0;
        let j = i;
        header_gridline_name = [];
        for (; j < this.model.attributes.length; j++) {
          if (this.model.attributes[j].type == 'Grid Lines') {
            this.div_coll.set(j1 - 1, header_gridline_name);
            this.tr_map.set(j1 - 1, header_gridline_name_data);
            i--;
            break;
          }
          header_gridline_name[ind] = this.model.attributes[j].label;
          header_gridline_name_data[ind] = "";
          ind++;
          i++;
        }
        if (j == this.model.attributes.length) {
          this.div_coll.set(j1 - 1, header_gridline_name);
          this.tr_map.set(j1 - 1, header_gridline_name_data);
          break;
        }
      }
    }
  }
  addModal() {

    this.wfline.header_id = this.id;
    this.wfline.model = JSON.stringify(this.model);

    this._line.addToDB(this.wfline).subscribe(
      (data: any) => {
        console.log('Data pushed successfully...');
        console.log(data);
        this.modal = false;
        this.ngOnInit();
      },
      (error: any) => {
        console.log('Error in adding data...');

      }
    );


  }

  onDrop2($event, item) {

  }
  name1Changed(value, i) {
    this.div_name_map.set(i, value);
    this.model.attributes[i].div_name = value;
    console.log(this.model.attributes)
  }
  onDragStart(event: DragEvent) {
    //  console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {
    // console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {
    // console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {
    // console.log("draggable linked", JSON.stringify(event, null, 2));
  }


  onDragCanceled(event: DragEvent) {
    // console.log("drag cancelled", JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent) {
    // console.log("dragover", JSON.stringify(event, null, 2));
  }
  flag = true;
  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {
      if (event.dropEffect === "copy")
        event.data.name = event.data.type + '-' + new Date().getTime();
      let index = event.index;
      if (typeof index === "undefined") {
        index = list.length;
      }

      list.splice(index, 0, event.data);
      console.log(list)
      // this.model.attributes[index].children =  [];
      // console.log(this.model.attributes[index].children.length);
      //   this.flag = true;
      //   for(let ind = index; ind>= 0; ind--) {
      //     if(this.model.attributes[ind].type == 'Division') {
      //       this.model.attributes[index].div_name = this.model.attributes[ind].label;
      //       this.flag = false;
      //       break;
      //     }
      //   }
      //   if(this.flag)
      //   this.model.attributes[index].div_name = "";
    }
    // this.copy_value();
  }



  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === "move") {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }
  addValue(values) {
    values.push(this.value);
    this.value = { label: "", value: "" };
  }
  addQuestions(questions) {
    console.log("questions", questions);
    console.log(this.value1);
    questions.push(this.value1);

    this.value1 = { label1: "", value1: "" };
  }
  val: string = '';
  // addQuestionData(questions)
  // {
  //   console.log("Questions ",questions);
  //  // questions.push(this.value1);
  //   console.log(this.value1);
  //   //questions.push(this.value1);
  //   //this.value1={label1:"",value1:""};
  // }
  // addValuesData(values)
  // {
  //   console.log("Value",values);
  //   //values.push(this.value);
  //  // this.value={label:"",value:""};
  // }
  found_flag = true;
  async removeField(list?: any[], val?: any) {
    this.found_flag = true;
    console.log(list);
    console.log(val)
    // swal({
    //   title: 'Are you sure?',
    //   text: "Do you want to remove this field?",
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#00B96F',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, remove!'
    // }).then((result) => {
    //   if (result.value) {
    //     this.model.attributes.splice(i,1);
    //   }
    // });
    const confirmed: any = await this.alertService.confirm('', 'Delete confirm?');
    if (confirmed.value) {
      for (let i = 0; i < this.model.attributes.length && this.found_flag; i++) {
        if (this.model.attributes[i].name == val) {
          this.model.attributes.splice(i, 1);
          this.found_flag = false;
          break;
        }
        else if (this.model.attributes[i].type == 'Division' || this.model.attributes[i].type == 'Grid Lines' || this.model.attributes[i].type == 'panel' || this.model.attributes[i].type == 'columns' || this.model.attributes[i].type == 'tab') {
          this.model.attributes[i].children = this.helper(this.model.attributes[i].children, val);
        }
      }
      this.toastr.success('Deleted successfully');
      this.copy_value();
    }
  }
  public helper(arrC: any[], val: any): any[] {
    for (let k = 0; k < arrC.length && this.found_flag; k++) {
      if (arrC[k].name == val) {
        arrC.splice(k, 1);
        this.found_flag = false;
        return arrC;
      }
      else if (arrC[k].type == 'Division' || arrC[k].type == 'Grid Lines' || arrC[k].type == 'panel' || arrC[k].type == 'columns' || arrC[k].type == 'tab') {
        arrC[k].children = this.helper(arrC[k].children, val);
      }
    }
    return arrC;
  }

  updateForm() {
    let input = new FormData;
    input.append('id', this.model._id);
    input.append('name', this.model.name);
    input.append('description', this.model.description);
    input.append('bannerImage', this.model.theme.bannerImage);
    input.append('bgColor', this.model.theme.bgColor);
    input.append('textColor', this.model.theme.textColor);
    input.append('attributes', JSON.stringify(this.model.attributes));

    // this.us.putDataApi('/admin/updateForm',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','App updated successfully','success');
    // });
  }


  initReport() {
    this.report = true;
    let input = {
      id: this.model._id
    }
    // this.us.getDataApi('/admin/allFilledForms',input).subscribe(r=>{
    //   this.reports = r.data;
    //   console.log('reports',this.reports);
    //   this.reports.map(records=>{
    //     return records.attributes.map(record=>{
    //       if(record.type=='checkbox'){
    //         record.value = record.values.filter(r=>r.selected).map(i=>i.value).join(',');
    //       }
    //     })
    //   });
    // });
  }



  toggleValue(item) {
    item.selected = !item.selected;
  }

  submit() {
    let valid = true;
    let validationArray = JSON.parse(JSON.stringify(this.model.attributes));
    validationArray.reverse().forEach(field => {
      console.log(field.label + '=>' + field.required + "=>" + field.value);
      if (field.required && !field.value && field.type != 'checkbox') {
        //swal('Error','Please enter '+field.label,'error');
        valid = false;
        return false;
      }
      if (field.required && field.regex) {
        let regex = new RegExp(field.regex);
        if (regex.test(field.value) == false) {
          // swal('Error',field.errorText,'error');
          valid = false;
          return false;
        }
      }
      if (field.required && field.type == 'checkbox') {
        if (field.values.filter(r => r.selected).length == 0) {
          // swal('Error','Please enterrr '+field.label,'error');
          valid = false;
          return false;
        }

      }
    });
    if (!valid) {
      return false;
    }
    let input = new FormData;
    input.append('formId', this.model._id);
    input.append('attributes', JSON.stringify(this.model.attributes))
    // this.us.postDataApi('/user/formFill',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','You have contact sucessfully','success');
    //   this.success = true;
    // },error=>{
    //   swal('Error',error.message,'error');
    // });
  }
  openPreview() {
    this.modal2 = true
  }
  test() {

  }
  editProperty(val) {
    console.log(val.toggle)
    val.toggle = true;
  }

  openmodal() {
    this.modal = true;
  }

  toggle: boolean;
  toggleMenu() {
    this.toggle = !this.toggle;
  }

  getColumns(value) {
    console.log(value);
    return {
      'col-md-1': value == 1,
      'col-md-2': value == 2,
      'col-md-3': value == 3,
      'col-md-4': value == 4,
      'col-md-6': value == 6,
      'col-md-12': value == 12,

    }
  }
  // "Default","Primary","Info","Success","Danger","Warning"
  getClass(theme) {
    return {
      'bg-primary': theme == 'Primary',
      'bg-info': theme == 'Info',
      'bg-default': theme == 'Default',
      'bg-Success': theme == 'Success',
      'bg-Danger': theme == 'Danger',
      'bg-Warning': theme == 'Warning',
    }

  }

  onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    console.log(data);
  }

  onReady(eventData) {

    console.log(this.myEditor);
    eventData.ui
      .getEditableElement()
      .parentElement.insertBefore(
        eventData.ui.view.toolbar.element,
        eventData.ui.getEditableElement()
      );

    eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      console.log(btoa(loader.file));
      return new UploadAdapter(loader);
    };
  }
  wireframeName:string[];
  getallwireframe(){
    this._line.getAllwireframes(this.projectId).subscribe((data)=>{
      console.log(data);
      let dataW = data.map((option: string) => option.replace(/"/g, '')); // Remove the double quotes from each option
      this.wireframeName = dataW;
    },(error)=>{
      if(error){
        console.log(error);
      }
    });
  }

  selectedFile:File[]=[];
  fileUploadError = false;
  public onFileChange(event){
    this.selectedFile = event.target.files[0];
    this.fileUploadError = true;
  }

  selectedimage:File[]=[];
  imageUploadError = false;
  public onimageChange(event){
    this.selectedFile = event.target.files[0];
    this.imageUploadError = true;
  }

  selectedaudio:File[]=[];
  audioUploadError = false;
  public onaudioChange(event){
    this.selectedaudio = event.target.files[0];
    this.audioUploadError = true;
  }
  selectedvideo:File[]=[];
  videoUploadError = false;
  public onvideoChange(event){
    this.selectedvideo = event.target.files[0];
    this.videoUploadError = true;
  }

  AddTolibrary(): void {
    this._line.addToLibrary(this.id).subscribe(
      (response) => {
        // Handle the response from the API
        console.log(response);
        this.toastr.success('Add To Library successfully');
      },
      (error:HttpHeaderResponse) => {
        // Handle errors
        console.error(error);
        if(error.status == 500){
        this.toastr.warning('Add some fields');
        }
        if(error.status == 400){
          this.toastr.error('Add To Library Unsuccessful');
        }
      }
    );
  }
  

}
class UploadAdapter {
  loader: any;
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file
      .then(file => new Promise((resolve, reject) => {
        var myReader = new FileReader();
        myReader.onloadend = (e) => {
          resolve({ default: myReader.result });
        }

        myReader.readAsDataURL(file);
      }));
  };
  

  
}
