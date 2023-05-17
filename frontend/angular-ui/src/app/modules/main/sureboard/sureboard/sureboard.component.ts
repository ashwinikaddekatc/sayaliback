import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { ColumnServiceService } from 'src/app/services/sureboard/column-service.service';
import { CardServiceService } from 'src/app/services/sureboard/card-service.service';
import { BoardServiceService } from 'src/app/services/sureboard/board-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfoService} from '../../../../services/user-info.service';
import * as moment from 'moment';
import { IterationServiceService } from 'src/app/services/sureboard/iteration-service.service';
import { GoalServiceService } from 'src/app/services/sureboard/goal-service.service';
import { MilestoneServiceService } from 'src/app/services/sureboard/milestone-service.service';
import { AnyCnameRecord } from 'dns';
@Component({
  selector: 'app-sureboard',
  templateUrl: './sureboard.component.html',
  styleUrls: ['./sureboard.component.scss'],
  host: {
    "(window:click)": "onClickMenu()"
  }
})
export class SureboardComponent implements OnInit {
  loading = false;
  getallboardmodal=false;
  boarddata;
addboardmodal=false;
  masterSelected :boolean= false;
  taskmodel:boolean=false;
  checkboxes: any[];
  checkedCategoryList:any;
  checkedList:any;
  isSelected:boolean=false
  oneColdata:any;
  searchtext:any;

  colID:any;
  allIterationdata:any;
  allGoalData:any;
  allMilestoneData:any;
  // getting values objects
  cols: any;
  cards: any;
  board: any;

  countdata:any;
  dataCount:any;
  // setting values object
  onecol = {
    'cName': '',
    'board': ''
  };
  onecard = {
    'title': '',
    'date': '',
    'image': '',
    'description':'',
    'presentColumn': '',
    'column': ''
  };
  // onecard=[{

  //   title: '',
  //     date: '',
  //     image: '',
  //     description:'',
  //     presentColumn: '',
  //     column: ''
  // }]
one=[{

  title: '',
    date: '',
    image: '',
    description:'',
    presentColumn: '',
    column: ''
}]
  cardData = {
    title: '',
    date: '',
    image: '',
    presentColumn: '',
    description: '',
    tags: '',
    storyPoints: '',
    valuePoints: '',
    issueType: '',
    assigned_to: '',
    scheduledDate: '',
    attachmentTaA: '',
    story_details: '',
    scenario_given_when: '',
    data_expected_result: '',
    functional_area_passfail_details: '',
    scalibility: '',
    test_case_demo_case: '',
    estimates: '',
    dor_approval_status: '',
    gitCommited: '',
    code_quality_review_done: '',
    peer_revired: '',
    builds_without_error: '',
    unit_test_details: '',
    promoted_test_instance: '',
    configuration_changes: '',
    unit_test_details2: '',
    closed_for_clocking: '',
    attachmentDoD: '',
    priority_index: '',
    related_issue: '',
    estimated_time: '',
    elapsed_time: '',
    start_date_time: '',
    completion_date_time: '',
    project: '',
    repository: '',
    sprint_test: '',
    current_status: '',
    clock_status: '',
    project_priority: '',
    pinned_status: '',
    requested_by:'',
    milestone:'',
    iteration:'',
    goal:'',
    column: {
      cId: '',
    },
    checked:false,
  }

  onecardu: any;
  onecolu: any;

  // flag variables
  flag = false;
  flag2 = false;
  flag3 = false;

  isCreateModelVisible = false;
  isModalVisible = false;
  isModalVisibleCard = false;
  isModalVisibleCardUpdate = false;
  open = false;

  isColVisible = false;

  modalCreate = false;

  modalEdit = false;
  newCardEdit = false;
  rowSelected :any= {};

  finalcol: Array<any>;
  ocol: any;
  currtime: any;

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;




  filterDirectory: any[] = [
    {
        name: " Quick Filters",
        expanded: false,
        files: [
            {
                //icon: "calendar",
                name: "Calendar",
            },
            {
                name: "Charts",
               // active: false
            },
            {
                name: "Dashboard",
               // active: false
            },
            {
                name: "Maps",
                //active: false
            },
        ]
    },
  ];
  teamDirectory: any[] = [
    {
        name: "Teams",
        expanded: false,
        files: [
            {
                //icon: "calendar",
                name: "team1",
            },
            {
                name: "team2",
               // active: false
            },
            {
                name: "team3",
               // active: false
            },
            {
                name: "team3",
                //active: false
            },
        ]
    },
  ];
  repositoriesDirectory: any[] = [
    {
        name: "Repositories",
        expanded: true,
        files: [
            {
                //icon: "calendar",
                name: "Backend",
            },
            {
                name: "Frontend",
               // active: false
            },
            {
                name: "Mobile",
               // active: false
            },
        ]
    },
  ];
  public entryForm: FormGroup;
 public cardentryForm:FormGroup;
  type="project";
  boardID:number=107;
  projectname:any;
  user_id;
  currentDate = new Date();
  constructor(private _col: ColumnServiceService,
    private _card: CardServiceService,
    private _board: BoardServiceService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private toastr: ToastrService,
    private userInfoService:UserInfoService,
    private iterationservice: IterationServiceService,
    private goalservice: GoalServiceService,
    private milstoneservice:MilestoneServiceService
    ) {this.finalcol = new Array<any>(); }
currentdate;
colsId;
pid;
  ngOnInit(): void {
    this.getallIteration();
    this.getallGoals();
    this.getallMilestone();
    this.route.queryParams.subscribe(params => {
      this.pid = +params['pid'];

    });

    console.log("update with id = ", this.pid);
    console.log(this.currentDate);
    this.currentdate = moment().format("DD MM YYYY");
    console.log(this.currentdate)
    this.user_id = this.userInfoService.getUserId();
    console.log('user id: ' + this.user_id);
    this.projectname= this.route.snapshot.queryParams.id
    // this.route.queryParams.subscribe(params => {
      //this.projectname = +params['pname'];
      console.log(this.projectname);
   // });
    this._col.getColumnsOfBoard(this.boardID).subscribe(
      (data: any)=>{
        this.cols = data;
        console.log(this.boardID);
       console.log(this.cols);
        this.cols.forEach((c: any)=>{
          c['cdata'] = '';
          this._card.getCardsOfColumn(c.cId).subscribe(
            (datacard: any)=>{
              c['cdata'] = datacard;
            },
            (err: any)=>{
              console.log('error: '+err);
            }
          );
        });
        console.log("cols data");
        console.log(this.cols);
        this.colID = this.cols[0].cId;
        console.log("1st col id ",this.colID);
      },
      (error: any)=>{
        console.log('Error in loading data : ' + error);

      }
    );

    this._board.getOneBoard(107).subscribe(
      (data: any)=>{
        this.board = data;
        console.log(this.board);
      },
      (error: any)=>{
        console.log('error occured while getting board.');
      }
    );
//add board form
this.entryForm = this._fb.group({
  bName:[null] ,
  type:['Other'] ,
  project_id:[null] ,
    });
    //card
    this.cardentryForm = this._fb.group({
      cards: this._fb.array([this.initLinesForm()]),
        });
      }
      initLinesForm() {
        return this._fb.group({
          title: [null],
          date: this.getCurrentTime(),
        image: ['defaultPhoto.png'],
       description:[null],
      presentColumn: [null],
      columnid: this.colsId
       })

    }


      get controls() {
        return (this.cardentryForm.get("cards") as FormArray).controls;
      }
      onRemoveLines(index: number) {
        (<FormArray>this.cardentryForm.get("cards")).removeAt(index);
      }
      onAddLines() {

        (<FormArray>this.cardentryForm.get("cards")).push(this.initLinesForm());
      }

  selectAllLineItem(id, event) {
    this._card.getCardsOfColumn(id).subscribe(
          (datacard: any)=>{
            this.oneColdata = datacard;
            console.log(this.oneColdata);
          },
          (err: any)=>{
            console.log('error: '+err);
          }
        );
    console.log(event);
    this.oneColdata.forEach(x => x.checked = event.target.checked)
    //const checked = event.target.checked;
    //this.oneColdata.forEach(item => item.checked = checked);
  }

  selectAllItems: boolean = false;
  onItemChange(itemIdx: number, isChecked: boolean) {
    this.oneColdata[itemIdx].checked = isChecked;
    // doesn't if selectAllItems is already false.
    if (!isChecked) this.selectAllItems = false;
  }

  getallIteration()
  {
      this.iterationservice.getall().subscribe((data)=>{
        this.allIterationdata=data
     console.log("allIterationdata ",this.allIterationdata);
      })
  }
  getallGoals()
  {
      this.goalservice.getall().subscribe((data)=>{
      this.allGoalData=data
      console.log("allGoalData",this.allGoalData);
      })
  }
  getallMilestone()
  {
    this.milstoneservice.getall().subscribe((data)=>{
      this.allMilestoneData=data
      console.log("allMilestoneData ",this.allMilestoneData);
    })
  }

  onEdit(row) {
    console.log(row);
    this.newCardEdit = true;

    this._card.getOneCard(row).subscribe(
      (data: any)=>{
        this.onecardu = data;
        console.log(this.onecardu);
      },
      (error: any)=>{
        console.log('error occured while getting card data for updation');
      }
    );
    this.modalEdit = true;
  }
  drop(event: CdkDragDrop<string[]>,id:any, data:any) {
    console.log(id,data);
      this.onecolu=data;
      for( data;data>=data.length;data++){
        console.log(data.column.cId)
        if(data.column.cId != id){
          data.column.cId=id;

        }console.log(data)
      }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("drop event");
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        console.log("drop event else", event);
    }
  }

  addColumn(){
    this.onecol.board = this.board;

    this._col.createcolumn(this.onecol).subscribe(
      (data: any)=>{
        console.log('column added successfully..'+ data);
        // console.log(this.onecol);
        this.flag = false;
        this.isModalVisible = false;
        this.ngOnInit();
      },
      (error: any)=>{
        console.log('Something went wrong : ' + error);

      }
    );

  }

  addCard(cid: any){
    // this.flag2 = true;

    console.log(cid);
    this.colsId = cid;
  //  console.log("this.colsId",this.colsId);
  this.cardentryForm.value.cards.columnid=cid;
  //this.initLinesForm();
  this.ngOnInit();
    this._col.getOneColumn(cid).subscribe(
      (data: any)=>{
       // this.onecard.column = data;
       this.colsId = cid;
       console.log("addCard data",data);
       console.log(this.onecard.column);
       console.log(this.cardentryForm.value.cards.column);
        this.cardentryForm.value.cards.columnid=cid;
        //this.cardentryForm.value.cards.presentColumn=cid;
        this.onecard.column=data;
       console.log(this.cardentryForm.value)
        console.log( this.cardentryForm.value.cards.columnid);
        console.log( this.cardentryForm.value.cards.title);
        console.log( this.cardentryForm.value.cards.presentColumn);
        console.log(this.cardentryForm.getRawValue()['cards']);
        console.log(this.onecard.column);

      },
      (error: any)=>{
        console.log('error in getting column..' + error);

      }
    );

    // this.isModalVisibleCard = true;
    this.modalCreate = true;
    console.log(this.colsId);
    this.cardentryForm.value.cards.columnid=this.colsId;
    this.cardentryForm.value.cards.date = this.getCurrentTime();
    this.cardentryForm.value.cards.image = 'defaultPhoto.png';

  }

  addCardInCol()
  {
    this._col.getColumnsOfBoard(107).subscribe(
      (data: any)=>{
        this.cols = data;

        this.cols.forEach((c: any)=>{
          c['cdata'] = '';
          this._card.getCardsOfColumn(c.cId).subscribe(
            (datacard: any)=>{
              c['cdata'] = datacard;
            },
            (err: any)=>{
              console.log('error: '+err);
            }
          );
        });
        console.log("cols data");
        console.log(this.cols);
      },
      (error: any)=>{
        console.log('Error in loading data : ' + error);

      }
    );
    this.modalCreate = true;

    this.onecard.date = this.getCurrentTime();
    this.onecard.image = 'defaultPhoto.png';
  }


  addCardDb(){
    console.log("oncard data");
    console.log( this.cardentryForm.value);
    console.log( this.cardentryForm.value.cards.column);
    console.log(this.cardentryForm.getRawValue()['cards']);
    console.log("this.onecard ",this.onecard);
var carddata= this.cardentryForm.getRawValue()['cards']
     // this._card.createCard(this.onecard).subscribe(
      this._card.createCard(this.cardentryForm.getRawValue()['cards']).subscribe(
      (data: any)=>{
        console.log('Card added successfully..'+ data);
        console.log(this.onecard);

        this.ngOnInit();
        this.taskmodel = false;
        this.modalCreate = false;
      },
      (error: any)=>{
        console.log('Error in adding card..'+ error);
      }
    );
  }

  addCardDb1()
  {
    console.log("oncard data/...");
    console.log(this.onecard);

      this._card.createCard(this.onecard).subscribe(
      (data: any)=>{
        console.log('Card added successfully..'+ data);
        console.log(this.onecard);

        this.ngOnInit();
        // this.isModalVisibleCard = false;
        this.isCreateModelVisible = false;
      },
      (error: any)=>{
        console.log('Error in adding card..'+ error);
      }
    );
  }

  getBoard(){
    this._board.getOneBoard(107).subscribe(
      (data: any)=>{
        this.board = data;
        console.log("switch method of board ",this.board);
      },
      (error: any)=>{
        console.log('Error occured: '+ error);

      }
    );
  }


  updateCard(){
    console.log(this.onecardu);

    this._card.updateCard(this.onecardu).subscribe(
      (data: any)=>{
        console.log('card updated successfully.');
        this.onecardu = data;
        console.log('Updated Card: ' + this.onecardu);
        this.modalEdit = false;
        this.ngOnInit();
      },
      (error: any)=>{
        console.log('card not updated..');

      }
    );
    this.newCardEdit = false;

  }

  oncEdit(cid: any){
    this._col.getOneColumn(cid).subscribe(
      (data: any)=>{
        this.onecolu = data;

      },
      (err: any)=>{
        console.log('Error occured while fetching column data.');

      }
    );
    this.isColVisible = true;
  }

  updateCol(){
    console.log(this.onecolu);
    this._col.updatecolumn(this.onecolu).subscribe(
      (data: any)=>{
        console.log('Column has been updated successfully..');
        console.log('updated data: ' + data);
        this.isColVisible = false;
        this.ngOnInit();
      },
      (error: any)=>{
        console.log('Something went wrong while updating column details..');

      }
    );
  }

  settrue(){
    this.flag = true;
  }

  getCurrentTime(){
    let date: Date = new Date();
    this.currtime = date.toString();
    this.currtime = this.currtime.split(' ', 5);
    let d = this.currtime[1] + ' ' + this.currtime[2] + ' ' + this.currtime[3];
    let t = this.currtime[4];
    // let time = d + ' ' + t;
    let time = d;
    return time;
  }

tmodel(){

   console.log("In tmodel method ",this.colID);
    this.colsId = this.colID;
  //  console.log("this.colsId",this.colsId);
  this.cardentryForm.value.cards.columnid=this.colID;
  //this.initLinesForm();
  this.ngOnInit();
    this._col.getOneColumn(this.colID).subscribe(
      (data: any)=>{
       // this.onecard.column = data;
       this.colsId = this.colID;
       console.log("addCard data",data);
       console.log(this.onecard.column);
       console.log(this.cardentryForm.value.cards.column);
        this.cardentryForm.value.cards.columnid=this.colID;
        //this.cardentryForm.value.cards.presentColumn=cid;
        this.onecard.column=data;
       console.log(this.cardentryForm.value)
        console.log( this.cardentryForm.value.cards.columnid);
        console.log( this.cardentryForm.value.cards.title);
        console.log( this.cardentryForm.value.cards.presentColumn);
        console.log(this.cardentryForm.getRawValue()['cards']);
        console.log(this.onecard.column);

      },
      (error: any)=>{
        console.log('error in getting column..' + error);

      }
    );

    // this.isModalVisibleCard = true;
    this.taskmodel=true;
    console.log(this.colsId);
    this.cardentryForm.value.cards.columnid=this.colsId;
    this.cardentryForm.value.cards.date = this.getCurrentTime();
    this.cardentryForm.value.cards.image = 'defaultPhoto.png';

}
  onFinish(){
    // this.cardData.image = 'defaultPhoto.png';
    this.cardData.date = this.getCurrentTime();
    this.cardData.priority_index = '5.3';
    this.cardData.related_issue = 'Test Issue for wireframe create users #1110';
    this.cardData.estimated_time = '8 Hrs';
    this.cardData.elapsed_time = '16 hrs 35 sec';
    this.cardData.start_date_time = '07/07/2020 12:35:00';
    this.cardData.completion_date_time = '07/07/2020 12:35:00';
    this.cardData.project = 'Test Project';
    this.cardData.repository = 'Test Repository';
    this.cardData.sprint_test = 'Sprint';
    this.cardData.current_status = 'Spring Backlog';
    this.cardData.clock_status = 'Not Started';
    this.cardData.project_priority = 'Yes';
    this.cardData.pinned_status = 'Yes';
    this.cardData.checked = false;
console.log(this.cardData);
    console.log('Finish button clicked...');
    this._card.createCard(this.cardData).subscribe(
      (data: any)=>{
        console.log('Issue card added successfylly..');
        this.open = false;
        this.ngOnInit();
      },
      (error: any)=>{
        console.log('Error occured while adding issue card..');

      }
    );

  }

  delCard(id){
    console.log('delete button clicked..' +id);
    this._card.deleteCard(id).subscribe(
      (data: any)=>{
        console.log('Card deleted successfully..',data);
        this.newCardEdit = false;
        this.ngOnInit();

      },
      (error: any)=>{
        console.log('Error occured while deleting card');

      }
    );
  }

  delColumn(cid){
    console.log('column delete button clicked: ' + cid);
    this._col.deleteColumn(cid).subscribe(
      (data: any)=>{
        console.log('column deleted successfully..');
        this.isColVisible = false;
        this.ngOnInit();

      },
      (error: any)=>{
        console.log('error in deleting column...');

      }
    );
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:9191/cards/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );


  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:9191/cards/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }


  goToAddRules()
  {
      //alert("goToAddRules function");
      this.router.navigate(["../sureboard-rules"], { relativeTo: this.route,queryParams: { boardid: this.boardID } });
  }
  gototype()
  {
      //alert("goToAddRules function");
      this.router.navigate(["../types"], { relativeTo: this.route,});
  }

  flag1:boolean = true;
  isMenuOpen = false;
  isShowDiv1:boolean = false;
  isShowDiv2:boolean = false;
  isShowDiv3:boolean = false;
  isShowDiv4:boolean = false;
  isArrowDown1:boolean = true;
  isArrowDown2:boolean = true;
  isArrowDown3:boolean = true;
  isArrowDown4:boolean = true;
  switchbtn:boolean = true;
  gotomenu( $event){
   // document.getElementById("div2").classList.toggle("show");
    //this.flag1 = false;
    $event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;

    // var menuList = document.getElementById('dropdownmenu').style.display;
    // console.log(menuList);
    // if (menuList == "none")
    // {
    //   this.flag1 = false;
    //   document.getElementById('dropdownmenu').style.display = 'block';
    // } else
    // {
    //   this.flag1 = true;
    //   document.getElementById('dropdownmenu').style.display = 'none';
    // }
  }

  onClickMenu()
  {
    //this.flag1 = true;
      //document.getElementById('dropdownmenu').style.display = 'none';
      this.isMenuOpen = false;
  }

  categoryABC()
  {
   // document.getElementsByClassName("abc").classList.toggle("down");
    this.isShowDiv1 = !this.isShowDiv1;
    this.isArrowDown1 = !this.isArrowDown1;
  }
  categoryLMN()
  {
    this.isShowDiv2 = !this.isShowDiv2;
    this.isArrowDown2 = !this.isArrowDown2;
  }
  categoryXYZ()
  {
    this.isShowDiv3 = !this.isShowDiv3;
    this.isArrowDown3 = !this.isArrowDown3;
  }
  categoryOthers()
  {
   // document.getElementById("category-body4").classList.toggle("show");
    this.isShowDiv4 = !this.isShowDiv4;
    this.isArrowDown4 = !this.isArrowDown4;
  }
  switchCategory()
  {
    //alert();
    console.log("switch category method call");
   this.switchbtn = !this.switchbtn;
   this.flag1 = !this.flag1;
  }
  addboard(){
    this.addboardmodal=true;
    //this.onCreate();
    }
  onCreate() {
    this.addboardmodal=false;
     this._board.addBoard(this.entryForm.value).subscribe(data => {
       console.log(data)
       if (data) {
        this.toastr.success(' Board Added successfully');
            }
       this.ngOnInit();

      },
       (error) => {
         console.log(error);
         if(error){
          this.toastr.error('Not added Data Getting Some Error');
        }
       }
     );
   }
   getboard(){
    this.getallboardmodal=true;
    this._board.getAllBoards().subscribe((data)=>{
      this.boarddata=data;
      console.log(this.boarddata);
    })
   }

   getclickboarddata;

   getboardid(id:number){
    this.boardID=id;
    console.log("cliked by"+id);
this._col.getColumnsOfBoard(this.boardID).subscribe((data)=>{
  this.getclickboarddata=data;
  console.log(this.getclickboarddata);
  this.cols = this.getclickboarddata;
  this.ngOnInit();
  console.log(this.boardID);
});

    // this._board.getOneBoard(this.clickedID).subscribe((data)=>{
    //   this.getclickboarddata=data;
    //   console.log(this.getclickboarddata)
    // })
    this.getallboardmodal=false;
  }
  getowned(){
    this._card.getownedby(this.user_id,this.boardID).subscribe((data)=>{
      console.log(data);
      let menuButton = document.getElementById("menu_btn");
    menuButton.style.color = '#FF0000';
    })
  }
  getrequest(){
    this._card.getrequestedby(this.user_id,this.boardID).subscribe((data)=>{
      console.log(data);
      let menuButton = document.getElementById("menu_btn1");
    menuButton.style.color = '#03AC13';
    menuButton.style.textDecoration= 'underline';
    })
  }
  getworkinpro(){
    this._card.getworkinprogress(this.boardID).subscribe((data)=>{
      console.log(data);
      let menuButton = document.getElementById("work");
    menuButton.style.color = '#03AC13';
    menuButton.style.textDecoration= 'underline';
    })
  }
  getlastmonth(){
this._card.lastmonth(this.currentdate).subscribe((data)=>{
  console.log(data);
})
  }
  getlastweek(){}

  goaldata;
  milestonedata;
  iterationdata;
  goalMethod()
  {
      this._card.getAllGoals(this.boardID).subscribe((data)=>{
        console.log("Goal Data",data);
        this.goaldata = data["cols"];
        console.log(this.goaldata)
        //this.ngOnInit();
        this.cols = this.goaldata;
        console.log(this.boardID);
       console.log(this.cols);
        this.cols.forEach((c: any)=>{
          c['cdata'] = '';
          this._card.getCardsOfColumn(c.cId).subscribe(
            (datacard: any)=>{
              c['cdata'] = datacard;
            },
            (err: any)=>{
              console.log('error: '+err);
            }
          );
        });
        console.log("cols data");
        console.log(this.cols);
        this.colID = this.cols[0].cId;
        console.log("1st col id ",this.colID);

      });
  }
  milestone()
  {
    this._card.getAllMilestone().subscribe((data)=>{
      console.log("Milestone Data",data);
      this.milestonedata = data;
    });
  }
  iteration()
  {
    this._card.getAllIteration().subscribe((data)=>{
      console.log("Iteartion Data",data);
      this.iterationdata = data;
    });
  }
}
