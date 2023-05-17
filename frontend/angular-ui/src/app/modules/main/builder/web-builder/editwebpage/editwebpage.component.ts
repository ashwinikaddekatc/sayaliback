import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { WidgetModel, DashboardContentModel, DashboardModel } from 'src/app/models/builder/webpagebuilder';
import { GridsterConfig } from 'angular-gridster2';
import { TextFieldComponent } from '../fields/text-field/text-field.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebpageBuilderService } from 'src/app/services/builder/webpage-builder.service';
import { TextAreaComponent } from '../fields/text-area/text-area.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { TableFieldComponent } from '../fields/table-field/table-field.component';
//import { BackgroundColorComponent } from '../fields/background-color/background-color.component';
//import { BoxFieldComponent } from '../fields/box-field/box-field.component';
import { ImgFieldComponent } from '../fields/img-field/img-field.component';
import { LineFieldComponent } from '../fields/line-field/line-field.component';
import { QrCodeComponent } from '../fields/qr-code/qr-code.component';

@Component({
  selector: 'app-editwebpage',
  templateUrl: './editwebpage.component.html',
  styleUrls: ['./editwebpage.component.scss']
})
export class EditwebpageComponent implements OnInit {

  // Editor = ClassicEditor;
   @ViewChild("myEditor") myEditor: any;
  // public Config = {
  //   placeholder: "Type the content here!"
  // };
  name = 'ng2-ckeditor';
  ckeConfig: any;
  ckeConfigs: any;
  @ViewChild('PageContent') PageContent: any;
  image: any = 'defaultPhoto.png';

  message: string;
  public profilePic: File = null;
  public profilePic1:any = null;

  hideme = {};
  switchbtn:boolean = true;
  editId:number;
  toggle:boolean;
  modeledit:boolean = false;
  modeledit2:boolean = false;

  minCols:any;
  minRows:any;
  public entryForm: FormGroup;

  WidgetsMock: WidgetModel[] = [
  // {
  // name: 'Text field',
  // identifier: 'text_field'
  // },
  {
    name: 'Text area',
    identifier: 'text_area'
  },
  {
    name: 'Table field',
    identifier: 'table_field'
  },
  {
    name: 'Image field',
    identifier: 'img_field'
  },
  {
    name: 'Line field',
    identifier: 'line_field'
  },
  {
    name: 'QR code',
    identifier: 'qr_code'
  },

]

public options: GridsterConfig;
	protected dashboardId: number;
	protected dashboardCollection: DashboardModel;
	//dashboardCollection:any;
	protected dashboardCollection1: DashboardModel[];
	public dashboardArray: DashboardContentModel[];

  protected componentCollection = [
		{ name: "Text field", componentInstance: TextFieldComponent },
    //{ name: "Text area", componentInstance: TextAreaComponent },
    { name: "Table field",componentInstance: TableFieldComponent},
   // { name: "Background Color", componentInstance: BackgroundColorComponent },
   // { name: "Box field", componentInstance: BoxFieldComponent },
    { name: "Image field",componentInstance: ImgFieldComponent},
    { name: "Line field", componentInstance: LineFieldComponent },
    { name: "QR code", componentInstance: QrCodeComponent }
	];

  model:any;
  linesdata:any;
  id:any;

  // value={
  //   val1:"",
  //   val2:"",
  //   val3:""
  // };

  editdata = {
    description : '',
    textname:'',
    id:'',
    content:'',
    attachmentImgname:this.profilePic1,
    textname1:''
};

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private toastr:ToastrService,
    private _fb: FormBuilder,
    private webpageservice : WebpageBuilderService
  ) { }

  ngOnInit(): void {

    this.getData();

    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      font_names: 'Arial;Times New Roman;Verdana',
      toolbarGroups: [
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        '/',
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
      ],
      removeButtons: 'Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Strike,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Unlink,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,Maximize,ShowBlocks,About'
    };
    this.ckeConfigs = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      removePlugins: 'horizontalrule,tabletools,specialchar,about,list,others',
      removeButtons: 'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,Font,FontSize,TextColor,BGColor,ShowBlocks,Cut,Copy,Paste,Table,Image,Format,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote,Underline,tools'
    };

    console.log("Grid options");
    //console.log("type ",this.options.gridType);
    //console.log("rows ",this.options.minRows);
      // Grid options
      this.options = {
        gridType: "fit",
        //setGridSize: true,
        pushItems: true,
        enableEmptyCellDrop: true,
        emptyCellDropCallback: this.onDrop,
        swap: true,
        pushDirections: { north: true, east: true, south: true, west: true },
        resizable: { enabled: true },
        itemChangeCallback: this.itemChange.bind(this),
        draggable: {
          enabled: true,
          ignoreContent: true,
          dropOverItems: true,
          dragHandleClass: "drag-handler",
          ignoreContentClass: "no-drag",
        },
        displayGrid: "always",
        minCols: 70,
        minRows: 99,
        // maxCols: 100,
        // maxRows:100,
        margin:1,
        resizableHandles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }
      };


      this.editId = this.route.snapshot.params.id;
      console.log(this.editId);
      this.webpageservice.getById(this.editId).subscribe((data)=>{
        console.log("ngOnInit",data);
        this.linesdata = data;
        this.id = data.rp_Line[0].id;
        console.log("this.id ",this.id);
      },
      (error: any)=>{

      }
      );

      this.entryForm = this._fb.group({

        content: [null],
        id:[null],
        textname:[null],
        });
  }

  cancelModel()
  {
    this.modeledit = false;
    //CKEditor.destroy();
  }



  onSelectFile(event) {

    // const size = event.target.files[0].size;

    // this.profilePic = <File> event.target.files[0];
    // console.log(this.profilePic);


    let flag = 0;
    const mimeType = event.target.files[0].type;
    if(mimeType.match(/image\/*/) === null ){
      this.message = 'Only Image Type Is Supported';
      flag = flag + 1;
      return;
    }
    const size = event.target.files[0].size;
    if(size > 5000000) {
      flag = flag + 1;
      this.message = 'Plese Select image file under 2 MB';
      return;
    }
    console.log('flag value = ', flag);
    if(flag === 0) {
      this.profilePic = <File> event.target.files[0];
      console.log(this.profilePic);
      console.log(this.profilePic.name);
      this.profilePic1 = this.profilePic.name;
      const reader = new FileReader();
      this.image = this.profilePic;
      reader.readAsDataURL(this.profilePic);
      reader.onload = (_event) => {
      this.image = reader.result;
     // console.log("this.image ",this.image )
      }
      this.webpageservice.uploadImg(this.profilePic).subscribe((data)=>{
        console.log("response ",data);
     });
    }
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.image = (<FileReader>event.target).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
    console.log(this.image);
    console.log(this.image.name);
    this.webpageservice.uploadImg(this.image).subscribe((data)=>{
      console.log(data);
   });
  }

  onClick(item) {
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = false;
    });
    this.hideme[item.chartid] = true;
  }

  toggleMenu() {
    this.toggle = !this.toggle;
  }

  showBtn()
  {
    console.log("switch category method call");
    this.switchbtn = !this.switchbtn;
  }

  onDrag(event, identifier) {
  console.log("on drag",identifier);
  console.log("on drag ",event);
    event.dataTransfer.setData('widgetIdentifier', identifier);
  }
  datagadgets:any;
  dashboardLine:any;
  dashboardName:any;
  pagesize:any;
  getData() {
    // We get the id in get current router dashboard/:id
    this.route.params.subscribe(params => {
      // + is used to cast string to int
      this.dashboardId = +params["id"];
      // We make a get request with the dashboard id
      this.webpageservice.getById(this.dashboardId).subscribe(dashboard => {
        // We fill our dashboardCollection with returned Observable
        this.dashboardName = dashboard.dashboard_name;
        this.datagadgets = dashboard;
        this.dashboardLine = dashboard.rp_Line;
        console.log("this.datagadgets",this.datagadgets);
        this.pagesize = this.datagadgets.page_size;
        console.log("page size ",this.pagesize);

        if(this.pagesize == "A4")
        {
          console.log("A4 if");

          this.minCols = 70;
          this.minRows = 99;
        }
        else if(this.pagesize == "A3")
        {
          console.log("A3 if")
          this.minCols = 99;
          this.minRows = 140;
        }
        else if(this.pagesize == "A2")
        {
          console.log("A2 if")
          this.minCols = 140;
          this.minRows = 198;
        }
        else if(this.pagesize == "A1")
        {
          console.log("A1 if")
          this.minCols = 198;
          this.minRows = 280;
        }

        console.log("this.dashboardLine",this.dashboardLine);
        this.dashboardCollection =JSON.parse(this.dashboardLine[0].model) ;
        console.log("this.dasboard  ",this.dashboardCollection );
        console.log(this.dashboardCollection);
        // We parse serialized Json to generate components on the fly
        this.parseJson(this.dashboardCollection);
        // We copy array without reference
        this.dashboardArray = this.dashboardCollection.dashboard.slice();
        console.log("this.dashboardArray",this.dashboardArray);
      });
    });
  }

  // Super TOKENIZER 2.0 POWERED BY NATCHOIN
  parseJson(dashboardCollection: DashboardModel) {
    // We loop on our dashboardCollection
    dashboardCollection.dashboard.forEach(dashboard => {
      // We loop on our componentCollection
      this.componentCollection.forEach(component => {
        // We check if component key in our dashboardCollection
        // is equal to our component name key in our componentCollection
        if (dashboard.component === component.name) {
          // If it is, we replace our serialized key by our component instance
          dashboard.component = component.componentInstance;
        }
      });
    });
  }

  serialize(dashboardCollection) {
    // We loop on our dashboardCollection
    dashboardCollection.forEach(dashboard => {
      // We loop on our componentCollection
      this.componentCollection.forEach(component => {
        // We check if component key in our dashboardCollection
        // is equal to our component name key in our componentCollection
        if (dashboard.name === component.name) {
          dashboard.component = component.name;
        }
      });
    });
  }

  itemChange() {
    this.dashboardCollection.dashboard = this.dashboardArray;
    console.log("itemChange this.dashboardCollection.dashboard ",this.dashboardCollection.dashboard);
    console.log("itemChange this.dashboardCollection ",this.dashboardCollection);
    console.log("itemChange this.dashboardCollection type",typeof this.dashboardCollection);
    console.log("itemChange this.dashboardArray ",this.dashboardArray);
    let tmp = JSON.stringify(this.dashboardCollection);
    console.log("temp data",tmp);
    let parsed: DashboardModel = JSON.parse(tmp);
    console.log("parsed data",parsed);
    console.log("let parsed ",typeof parsed);
    this.serialize(parsed.dashboard);
    console.log("item chnage function ", typeof this.dashboardArray);
    //this._ds.updateDashboard(this.dashboardId, parsed).subscribe();
  }

  onDrop(ev) {
    const componentType = ev.dataTransfer.getData("widgetIdentifier");
    switch (componentType) {
      // case "text_field":
      //   return this.dashboardArray.push({
      //     cols: 30,
      //     rows: 20,
      //     x: 0,
      //     y: 0,
      //     chartid:1,
      //     component: TextFieldComponent,
      //     name: "Text field"
      //   });

        case "text_area":
        return this.dashboardArray.push({
          cols: 30,
          rows: 20,
          x: 0,
          y: 0,
          chartid:2,
          component: TextFieldComponent,
          name: "Text area"
        });
        case "table_field":
        return this.dashboardArray.push({
          cols: 30,
          rows: 20,
          x: 0,
          y: 0,
          chartid:3,
          component: TableFieldComponent,
          name: "Table field"
        });
        // case "box_field":
        // return this.dashboardArray.push({
        //   cols: 30,
        //   rows: 20,
        //   x: 0,
        //   y: 0,
        //   chartid:5,
        //   component: BoxFieldComponent,
        //   name: "Box field"
        // });
        case "img_field":
        return this.dashboardArray.push({
          cols: 30,
          rows: 20,
          x: 0,
          y: 0,
          chartid:6,
          component: ImgFieldComponent,
          name: "Image field"
        });
        case "line_field":
        return this.dashboardArray.push({
          cols: 30,
          rows: 20,
          x: 0,
          y: 0,
          chartid:8,
          component: LineFieldComponent,
          name: "Line field"
        });
        case "qr_code":
        return this.dashboardArray.push({
          cols: 30,
          rows: 20,
          x: 0,
          y: 0,
          chartid:9,
          component: QrCodeComponent,
          name: "QR code"
        });
    }
  }
  removeItem(item) {
    console.log("remove item ",item);
    this.dashboardArray.splice(
      this.dashboardArray.indexOf(item),
      1
    );
    this.itemChange();
  }

    changedOptions() {
    this.options.api.optionsChanged();
  }

  modelid:number ;
  editGadget(item)
  {
    console.log(item);
    this.modeledit = true;
      this.modelid = item.chartid;
      console.log(this.modelid);
      this.editdata = item;
    if(item.chartid == 2)
    {
      this.modeledit = true;
      this.modelid = item.chartid;
      console.log(this.modelid);
      this.editdata = item;
    }
    if(item.chartid == 3)
    {
      this.modeledit2 = true;
      this.modelid = item.chartid;
      console.log(this.modelid);
      this.editdata = item;
    }

  }

  rp_Line = {
    //model:JSON.stringify(this.da),
    model:''
    }


  UpdateLine()
  {
  console.log('Add button clicked.......');
  console.log(this.dashboardArray);
  console.log(this.dashboardCollection);
  console.log(typeof this.dashboardCollection);
  console.log(this.id);
   //this.rp_Line.model = JSON.stringify(this.dashboardCollection);

//https://www.w3schools.com/js/tryit.asp?filename=tryjson_stringify_function_tostring

let cmp=this.dashboardCollection.dashboard.forEach(dashboard=>{
this.componentCollection.forEach(component=>{
  if (dashboard.name === component.name) {
    dashboard.component = component.name;
  }  })
})
console.log(cmp);

  let tmp = JSON.stringify(this.dashboardCollection);
   console.log("temp data",typeof tmp);
   console.log(tmp);
   let parsed= JSON.parse(tmp);
   this.serialize(parsed.dashboard);
  this.rp_Line.model = tmp;

  console.log("line data in addgadget ",this.rp_Line);
  console.log("line data in addgadget type ",typeof this.rp_Line);
  console.log("line model data ",this.rp_Line.model);
  console.log("line model data type",typeof this.rp_Line.model);
    this.webpageservice.UpdateLineData(this.id,this.rp_Line).subscribe(
      (data: any)=>{
        console.log('Updation Successful...');
        this.ngOnInit();
    console.log(data);
    this.router.navigate(["../../all"], { relativeTo: this.route })
      }
    );

  }

  onSubmit(id)
  {
 // console.log(this.entryForm.value);
 // console.log(id);
  //let formdata = this.entryForm.value;
 let formdata = this.editdata;
  let num = id;

    this.dashboardCollection.dashboard = this.dashboardCollection.dashboard.map(item => {
    if(item.chartid == num)
      {
      //item["product_id"] = "thisistest";
      const xyz = {...item,...formdata}
      console.log(xyz);
      return xyz;
      }
      return item
      });
    console.log(this.dashboardCollection.dashboard);
      this.modeledit = false;

     // this.entryForm.reset();

   }

   onSubmit2(id)
  {

  let formdata = this.entryForm.value;

  let num = id;

    this.dashboardCollection.dashboard = this.dashboardCollection.dashboard.map(item => {
    if(item.chartid == num)
      {

      const xyz = {...item,...formdata}
      console.log(xyz);
      return xyz;
      }
      return item
      });
    console.log(this.dashboardCollection.dashboard);
      this.modeledit2 = false;

   }

   getPageSize(pagesize)
   {
      return {'a4-size': pagesize == 'A4',
            'a3-size': pagesize == 'A3',
          'a2-size': pagesize == 'A2',
          'a1-size': pagesize == 'A1',
           }
   }


  //  onChange({ editor }: ChangeEvent) {
  //   const data = editor.getData();
  //   console.log(data);
  // }

  //   onReady(eventData)
  //   {

  //     console.log(this.myEditor);
  //     eventData.ui
  //       .getEditableElement()
  //       .parentElement.insertBefore(
  //         eventData.ui.view.toolbar.element,
  //         eventData.ui.getEditableElement()
  //       );

  //     eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
  //       console.log(btoa(loader.file));
  //       return new UploadAdapter(loader);
  //     };
  //   }

}
// class UploadAdapter {
//   loader: any;
//   constructor( loader ) {
//      this.loader = loader;
//   }

//   upload() {
//      return this.loader.file
//            .then( file => new Promise( ( resolve, reject ) => {
//                  var myReader= new FileReader();
//                  myReader.onloadend = (e) => {
//                     resolve({ default: myReader.result });
//                  }

//                  myReader.readAsDataURL(file);
//            } ) );
//   };
// }
