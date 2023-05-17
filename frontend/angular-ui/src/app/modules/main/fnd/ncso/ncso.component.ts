import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ncso',
  templateUrl: './ncso.component.html',
  styleUrls: ['./ncso.component.scss']
})
export class NcsoComponent implements OnInit {
  users;
status='Pending';
  searchtext:any;
  searchnavistext:any;
  searchpmodtext:any;
  searchcusttext:any;
  searchitemtext:any;
  modalclose:boolean=false;
  modalapproved:boolean=false;
  info: boolean = false;
  dipute:boolean=false;
  invoice:boolean=false;
  customer:boolean=false;
  navis:boolean=false;
  pmod:boolean=false;
  item:boolean=false;
  loading = false;
  givendata;
  diputedata;
  diputedata1;
  report;
  billingdata;
  custdata;
  itemdata;
  clickedID:number;
  selectedFile: File[]=[];
  public entryForm: FormGroup;
  submitted = false;
  allinvoicesunmenu;
  input: string;
alldata;
datanavis;
datapmod;
  userObj={
    status:'Pending',
    invoiceType:'ADV_RENTAL',
    customerOrderNo:'',
      serviceRenderedFrom:'',
      serviceRenderedTo:'',
      serviceRequestBy:'',
      specialPrice:'',
      serviceId:'',
      departmentDesc:'',
      customerCode:'',
      poNumber:'',
      vesselCode:'',
      vesselName:'',
      inVoyage:'',
      outVoyage:'',
      lineCode:'',
      callNo:'',
      loa:'',
      loaUom:'',
      gt:'',
      ata:'',
      atd:'',
      location:'',
      remarks:'',
      customerName:'',
      ataFormated:'',
      atdFormated:'',
      serviceRenderedFromFormated:'',
      serviceRenderedToFormated:''
  }
  //navis value populated
  userObj1={
    // status:'',
    // invoiceType:'',
    // customerOrderNo:'',
    //   serviceRenderedFrom:'',
    //   serviceRenderedTo:'',
    //   serviceRequestBy:'',
    //   specialPrice:'',
     serviceId:'',
    //   departmentDesc:'',
      customerCode:'',
      poNumber:'',
      vesselCode:'',
      vesselName:'',
      inVoyage:'',
      outVoyage:'',
      lineCode:'',
      callNo:'',
      loa:'',
      loaUom:'',
      gt:'',
      ata:'',
      atd:'',
      location:'',
      remarks:'',
      customerName:'',
      ataFormated:'',
      atdFormated:'',
  }
  userObjpmod={
    vesselCode:'',
    vesselName:'',
    inVoyage:'',
    outVoyage:'',
    lineCode:'',
    callNo:'',
    loa:'',
    loaUom:'',
    gt:'',
    ataFormated:'',
    atdFormated:'',
    ata:'',
    atd:'',
  }
  userobjcust={
    customerName:'',
    customerCode:'',
  }
  useritem=[ {
       itemCode:'',
       itemDesc:'',
       totalUnit:0 ,
       unitPrice:0
     }]
  // {
  //    itemCode:'003065J',
  //    itemDesc:'FUSE',
  // }
  custiddata: any;
  itemiddata: any;
  navisdata: any;
  navisiddata;
  usernavis={
    in_VOYAGE:'',
  }
  pmoddata: any;
  pmodiddata: any;
predata:any;
userdata={
  positionDesc:'',
  preparedBy:'',
  requestDate:'',
}
totalpagenoi:any;
  currentpagei:any;
  totalelementsi:any;
pagei:number=0;
pagen:number=0;
totalpagenon:any;
  currentpagen:any;
  totalelementsn:any;
pagep:number=0;
totalpagenop:any;
  currentpagep:any;
  totalelementsp:any;
  pagec:number=0;
  totalpagenoc:any;
  currentpagec:any;
  totalelementsc:any;
num1:string[]=[];
num2:string[]=[];

//result:Array<number>=Array<number>(100).fill(0);
result:number[]=[0];
rounded:any='';
grandtotal:number=0;
grandtotalstring:any=".00"
num11:number[]=[];
num12:number[]=[];
line:number[]=[0];
lines:string[]=[".00"]
  constructor(private _fb: FormBuilder,) { }

  ngOnInit(): void {
     this.entryForm = this._fb.group({
        status: ['Pending'],
        invoiceType: ['', [Validators.required]],
        customerOrderNo: [''],
        serviceRenderedFrom: [''],
        serviceRenderedTo:[''],
        serviceRequestBy:[''],
        specialPrice:[''],
        serviceId:[''],
        departmentDesc:[''],
        customerCode:['',[Validators.required]],
        customerName:[''],
        poNumber:[''],
        vesselCode:[''],
        vesselName:[''],
        inVoyage:[''],
        outVoyage:[''],
        lineCode:[''],
        callNo:[''],
        loa:[''],
        loaUom:[''],
        gt:[''],
        ata:[''],
        atd:[''],
        location:[''],
        remarks:[''],


        orderItems: this._fb.array([this.initLinesForm()]),
        orderAttachments: this._fb.array([this.initLinesForm1()]),
    });

  }
  initLinesForm() {
    return this._fb.group({

      lineId:[null],
      itemCode:[null] ,
      itemDesc:[null] ,
      totalUnit:[null] ,
      unitPrice:[null] ,
       linetotal:[null],
       totalUnitString:[null],
       unitPriceString: [null]

    });

  }
  initLinesForm1(){
    return this._fb.group({
      attachmentFilename:[null],
      attachmentId: [null],

    })
  }

  get controls() {
    return (this.entryForm.get("orderItems") as FormArray).controls;
  }
  onRemoveLines(index: number) {
    (<FormArray>this.entryForm.get("orderItems")).removeAt(index);
    if(!this.result[index]){
      this.result[index]=0;
      console.log("if loop");
      }
    this.grandtotal-=this.result[index];
    //this.grandtotal= Math.round((this.grandtotal + Number.EPSILON) * 100) / 100;
    //this.grandtotalstring=  Number(this.grandtotal).toLocaleString('en-GB');
    this.grandtotalstring = this.grandtotal.toFixed(2)
console.log( this.grandtotalstring);
if(+ this.grandtotalstring%1 !=0){
  this.grandtotalstring = this.numberWithCommas( this.grandtotalstring);
}
else
if(+this.grandtotalstring>=1000){
  this.grandtotalstring= this.numberWithCommas( this.grandtotalstring);
}
    this.num1.splice(index,1);
    this.num2.splice(index,1);
    this.result.splice(index,1);
    this.line.splice(index,1);
    this.lines.splice(index,1);
this.line[index]=Math.round((this.result[index] + Number.EPSILON) * 100) / 100;
this.useritem.splice(index,1);

  }
  onAddLines() {
    (<FormArray>this.entryForm.get("orderItems")).push(this.initLinesForm());
this.useritem.push({
  itemCode:'',
  itemDesc:'',
  totalUnit:0 ,
  unitPrice:0 ,

})
this.num1.push();
this.num2.push();
this.line.push(0);
this.lines.push(".00");
  }
  get controls1(){
    return (this.entryForm.get("orderAttachments") as FormArray).controls;
  }
  onRemoveLines1(index: number) {
    (<FormArray>this.entryForm.get("orderAttachments")).removeAt(index);
  }
  onAddLines1() {
    (<FormArray>this.entryForm.get("orderAttachments")).push(this.initLinesForm1());
  }
  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  gotoitem(i:any){
    console.log("selected row"+i);
   // this.row=i;
    this.item=!this.item;
  }
  public onFileChanged(event) {
    //Select File
    //this.selectedFile = event.target.files[0];
    for (var i = 0; i < event.target.files.length; i++) {
      // var name = event.target.files[i].name;
      // var type = event.target.files[i].type;
      // var size = event.target.files[i].size;
      // var modifiedDate = event.target.files[i].lastModifiedDate;
      this.selectedFile.push(event.target.files[i]);
    }
  }
  opencustmod(){
    this.customer=!this.customer;
    //this.getallcust();

  }
  openinvoicemodal(){
    this.dipute=!this.dipute;
    //this.gotodiputeid();
  }
  openpmodmodal(){
    this.pmod=!this.pmod;
    //this.gotopmod();
  }
  opennavismodal(){
    this.navis=!this.navis;
    //this.gotonavis();
  }
}
