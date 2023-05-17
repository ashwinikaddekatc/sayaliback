import { Gnyandipta_tComponent } from './BuilderComponents/Gnyandipta_tfront/Gnyandipta_t.component';



import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from '../main/fnd/main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from '../main/admin/about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from '../main/admin/user/user.component';
import { HelperModule } from '../../pipes/helpers.module';
import { PasswordResetComponent } from '../main/admin/password-reset/password-reset.component';
import { UniversityComponent } from '../main/fnd/university/university.component';


// import { CronEditorModule } from '@winarg/ngx-cron-editor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DashboardComponent } from '../main/fnd/dashboard/dashboard.component';
import { OrderstatComponent } from '../main/fnd/orderstat/orderstat.component';
import { MenuGroupComponent } from '../main/admin/menu-group/menu-group.component';
import { AllMenuGroupComponent } from '../main/admin/menu-group/all/all-menu-group.component';
import { EditMenuGroupComponent } from '../main/admin/menu-group/edit/edit-menu-group.component';
import { ReadOnlyMenuGroupComponent } from '../main/admin/menu-group/read-only/readonly-menu-group.component';
import { MenuRegisterComponent } from '../main/admin/menu-register/menu-register.component';
import { AddMenurComponent } from '../main/admin/menu-register/add-menur/add-menur.component';
import { EditMenurComponent } from '../main/admin/menu-register/edit-menur/edit-menur.component';
import { AllMenurComponent } from '../main/admin/menu-register/all-menur/all-menur.component';
import { ReadonlyMenurComponent } from '../main/admin/menu-register/readonly-menur/readonly-menur.component';
import { ProfileSettingComponent } from '../main/admin/profile-setting/profile-setting.component';
import { UsermaintanceComponent } from '../main/admin/usermaintance/usermaintance.component';
import { UsermaintanceaddComponent } from '../main/admin/usermaintanceadd/usermaintanceadd.component';
import { UsermaintanceeditComponent } from '../main/admin/usermaintanceedit/usermaintanceedit.component';
import { UsergrpmaintenanceComponent } from '../main/admin/usergrpmaintenance/usergrpmaintenance.component';
import { MenuaccesscontrolComponent } from '../main/admin/menuaccesscontrol/menuaccesscontrol.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LogconfigComponent } from '../main/admin/logconfig/logconfig.component';

import { ScheduleComponent } from '../main/fnd/schedule/schedule.component';
import { SchedulepipelineComponent } from '../main/fnd/schedulepipeline/schedulepipeline.component';
import { ScheduleInfoComponent } from '../main/fnd/schedule-info/schedule-info.component';
import { SystemparametersComponent } from '../main/admin/systemparameters/systemparameters.component';
import { MenumaintanceComponent } from '../main/admin/menumaintance/menumaintance.component';
import { DocumentmasterComponent } from '../main/admin/documentmaster/documentmaster.component';
import { DocumentreferenceComponent } from '../main/admin/documentreference/documentreference.component';
import { DocumentstructureComponent } from '../main/admin/documentstructure/documentstructure.component';
import { Projectsetup1Component } from '../main/builder/projectsetup1/projectsetup1.component';
import { ProjectcardComponent } from '../main/builder/projectcard/projectcard.component';
import { ProjectsetupComponent } from '../main/builder/projectsetup/projectsetup.component';
import { AddprojectsetupComponent } from '../main/builder/projectsetup/addprojectsetup/addprojectsetup.component';
import { AllprojectsetupComponent } from '../main/builder/projectsetup/allprojectsetup/allprojectsetup.component';
import { EditprojectsetupComponent } from '../main/builder/projectsetup/editprojectsetup/editprojectsetup.component';
import { ModuleSetup1Component } from '../main/builder/module-setup1/module-setup1.component';
import { ModuleCardComponent } from '../main/builder/module-card/module-card.component';
import { ModuleSetupComponent } from '../main/builder/module-setup/module-setup.component';
import { AddmoduleSetupComponent } from '../main/builder/module-setup/addmodule-setup/addmodule-setup.component';
import { AllmoduleSetupComponent } from '../main/builder/module-setup/allmodule-setup/allmodule-setup.component';
import { EditmoduleSetupComponent } from '../main/builder/module-setup/editmodule-setup/editmodule-setup.component';
import { WireframeComponent } from '../main/builder/wireframe/wireframe.component';
import { AllwireframeComponent } from '../main/builder/wireframe/allwireframe/allwireframe.component';
import { AddwireframeComponent } from '../main/builder/wireframe/addwireframe/addwireframe.component';
import { EditwireframeComponent } from '../main/builder/wireframe/editwireframe/editwireframe.component';
import { Edit2wireframeComponent } from '../main/builder/wireframe/edit2wireframe/edit2wireframe.component';
import { UpdateWireframeComponent } from '../main/builder/wireframe/update-wireframe/update-wireframe.component';
import { WireframetypeComponent } from '../main/builder/wireframe/wireframetype/wireframetype.component';
import { PropertiesComponent } from '../main/builder/wireframe/properties/properties.component';
import { PropertyComponent } from '../main/builder/wireframe/property/property.component';
import { UinameeditComponent } from '../main/builder/wireframe/uinameedit/uinameedit.component';
import { ActionsComponent } from '../main/builder/wireframe/actions/actions.component';
import { SuredocrComponent } from '../main/builder/suredocr/suredocr.component';
import { SurefarmComponent } from '../main/builder/surefarm/surefarm.component';
import { SuregitComponent } from '../main/builder/suregit/suregit.component';
import { DndModule } from 'ngx-drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Wireframe1Component } from '../main/builder/wireframe1/wireframe1.component';
import { WireframeCardComponent } from '../main/builder/wireframe-card/wireframe-card.component';
import { Report2Component } from '../main/fnd/report2/report2.component';
import { ReporttypeComponent } from '../main/fnd/report2/reporttype/reporttype.component';
import { ReportBuilderComponent } from '../main/builder/report-builder/report-builder.component';
import { AddComponent } from '../main/builder/report-builder/add/add.component';
import { AllComponent } from '../main/builder/report-builder/all/all.component';
import { EditComponent } from '../main/builder/report-builder/edit/edit.component';
import { RbTableSetupComponent } from '../main/fnd/rb-table-setup/rb-table-setup.component';
import { RbColumnSetupComponent } from '../main/fnd/rb-column-setup/rb-column-setup.component';
import { RbWhereColumnSetupComponent } from '../main/fnd/rb-where-column-setup/rb-where-column-setup.component';
import { RbDateParamSetupComponent } from '../main/fnd/rb-date-param-setup/rb-date-param-setup.component';
import { ScienceComponent } from '../main/fnd/science/science.component';
import { ProjectviewComponent } from '../main/builder/module-setup/projectview/projectview.component';
import { AllprojectComponent } from '../main/builder/allproject/allproject.component';
import { AllprojectcardComponent } from '../main/builder/allprojectcard/allprojectcard.component';
import { SurebuilderComponent } from '../main/builder/surebuilder/surebuilder.component';
import { HttpClientModule } from '@angular/common/http';
import { SureboardComponent } from './sureboard/sureboard/sureboard.component';
import { MyworkspaceComponent } from '../main/admin/myworkspace/myworkspace.component';
import { UserRegistrationComponent } from '../main/admin/user-registration/user-registration.component';
import { GitfolderComponent } from '../main/builder/gitfolder/gitfolder.component';
import { Gitfolder1Component } from '../main/builder/gitfolder1/gitfolder1.component';
import { GitfileComponent } from '../main/builder/gitfile/gitfile.component';
import { Gitfile1Component } from '../main/builder/gitfile1/gitfile1.component';
import { Gitfolder2Component } from '../main/builder/gitfolder2/gitfolder2.component';
import { SureboardRuleComponent } from './sureboard/sureboard-rule/sureboard-rule.component';
import { AddruleBoardComponent } from './sureboard/addrule-board/addrule-board.component';
import { AddruleSureboardComponent } from './sureboard/addrule-sureboard/addrule-sureboard.component';
import { AddGoalComponent } from './sureboard/add-goal/add-goal.component';
import { AddIterationComponent } from './sureboard/add-iteration/add-iteration.component';
import { AddMilestoneComponent } from './sureboard/add-milestone/add-milestone.component';
import { GoalComponent } from './sureboard/goal/goal.component';
import { IterationReleaseComponent } from './sureboard/iteration-release/iteration-release.component';
import { MilestoneComponent } from './sureboard/milestone/milestone.component';
import { RbAdhocParamSetupComponent } from './fnd/rb-adhoc-param-setup/rb-adhoc-param-setup.component';
import { RbStdParamComponent } from './fnd/rb-std-param/rb-std-param.component';
import { RbQueryBuildComponent } from './fnd/rb-query-build/rb-query-build.component';
import { QueryRunnerComponent } from './fnd/query-runner/query-runner.component';
import { SelectBiComponent } from './fnd/select-bi/select-bi.component';
import { BiWidgetsComponent } from './fnd/bi-widgets/bi-widgets.component';
import { AddWidgetComponent } from './fnd/bi-widgets/add-widget/add-widget.component';
import { AllWidgetComponent } from './fnd/bi-widgets/all-widget/all-widget.component';
import { EditWidgetsComponent } from './fnd/bi-widgets/edit-widgets/edit-widgets.component';
import { BiDashboardComponent } from './fnd/bi-dashboard/bi-dashboard.component';
import { AllDashComponent } from './fnd/bi-dashboard/all-dash/all-dash.component';
import { AddDashComponent } from './fnd/bi-dashboard/add-dash/add-dash.component';
import { EditDashComponent } from './fnd/bi-dashboard/edit-dash/edit-dash.component';
import { AddDefinationComponent } from './fnd/bi-dashboard/add-defination/add-defination.component';
import { UpdateWidgetModalComponent } from './fnd/bi-dashboard/update-widget-modal/update-widget-modal.component';
import { Test19Component } from './fnd/test19/test19.component';
import { ActionBuilderComponent } from './fnd/action-builder/action-builder.component';
import { ActionBuilderLineComponent } from './fnd/action-builder/action-builder-line/action-builder-line.component';
import { AllActionComponent } from './fnd/action-builder/all-action/all-action.component';
import { AllActionBuilderLineComponent } from './fnd/action-builder/action-builder-line/all-action-builder-line/all-action-builder-line.component';
import { AddActionBuilderLineComponent } from './fnd/action-builder/action-builder-line/add-action-builder-line/add-action-builder-line.component';
import { EditActionBuilderLineComponent } from './fnd/action-builder/action-builder-line/edit-action-builder-line/edit-action-builder-line.component';
import { AddActionComponent } from './fnd/action-builder/add-action/add-action.component';
import { EditActionComponent } from './fnd/action-builder/edit-action/edit-action.component';
import { Allreport2Component } from './fnd/report2/allreport2/allreport2.component';
import { Addreport2Component } from './fnd/report2/addreport2/addreport2.component';
import { Editreport2Component } from './fnd/report2/editreport2/editreport2.component';
import { AllrepoComponent } from './builder/allrepo/allrepo.component';
import { RecentlymodifiedComponent } from './builder/recentlymodified/recentlymodified.component';
import { RecentlyarchivedComponent } from './builder/recentlyarchived/recentlyarchived.component';
import { MyfavComponent } from './builder/myfav/myfav.component';
import { OauthComponent } from './admin/oauth/oauth.component';
import { SureconnectComponent } from './admin/sureconnect/sureconnect.component';
import { EditsureconnectComponent } from './admin/editsureconnect/editsureconnect.component';
//import { ImageCropperModule } from './admin/image-cropper/image-cropper.module';
import { NcsoComponent } from './fnd/ncso/ncso.component';
import { BoardComponent } from './fnd/board/board.component';
import { DashbComponent } from './fnd/dashb/dashb.component';
import { ManagemenComponent } from './admin/managemen/managemen.component';
import { DashboardnewComponent } from './builder/dashboardnew/dashboardnew.component';
import { AllnewdashComponent } from './builder/dashboardnew/allnewdash/allnewdash.component';
import { AddnewdashComponent } from './builder/dashboardnew/addnewdash/addnewdash.component';
import { EditnewdashComponent } from './builder/dashboardnew/editnewdash/editnewdash.component';
import { DynamicModule } from 'ng-dynamic-component';
import { GridsterModule } from 'angular-gridster2';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './builder/dashboardnew/gadgets/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './builder/dashboardnew/gadgets/line-chart/line-chart.component';
import { RadarChartComponent } from './builder/dashboardnew/gadgets/radar-chart/radar-chart.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BarChartComponent } from './builder/dashboardnew/gadgets/bar-chart/bar-chart.component';
import { BubbleChartComponent } from './builder/dashboardnew/gadgets/bubble-chart/bubble-chart.component';
import { DynamicChartComponent } from './builder/dashboardnew/gadgets/dynamic-chart/dynamic-chart.component';
import { ScatterChartComponent } from './builder/dashboardnew/gadgets/scatter-chart/scatter-chart.component';
import { PolarChartComponent } from './builder/dashboardnew/gadgets/polar-chart/polar-chart.component';
import { PieChartComponent } from './builder/dashboardnew/gadgets/pie-chart/pie-chart.component';
import { FinancialChartComponent } from './builder/dashboardnew/gadgets/financial-chart/financial-chart.component';
import { ToDoChartComponent } from './builder/dashboardnew/gadgets/to-do-chart/to-do-chart.component';
import { EditruleBoardComponent } from './sureboard/editrule-board/editrule-board.component';
import { SurepipeComponent } from './builder/surepipe/surepipe.component';
import { AddpipeComponent } from './builder/addpipe/addpipe.component';
import { SurepipeeditComponent } from './builder/surepipeedit/surepipeedit.component';
import { PivotReportComponent } from './builder/pivot-report/pivot-report.component';
import { WorkflowComponent } from './fnd/workflow/workflow.component';
import { AddworkflowComponent } from './fnd/workflow/addworkflow/addworkflow.component';
import { AllworkflowComponent } from './fnd/workflow/allworkflow/allworkflow.component';
import { EditworkflowComponent } from './fnd/workflow/editworkflow/editworkflow.component';
import { UpdateWorkflowComponent } from './fnd/workflow/update-workflow/update-workflow.component';
import { EditIterationComponent } from './sureboard/edit-iteration/edit-iteration.component';
import { EditMilestoneComponent } from './sureboard/edit-milestone/edit-milestone.component';
import { EditGoalComponent } from './sureboard/edit-goal/edit-goal.component';
import { UserstoryComponent } from './sureboard/userstory/userstory.component';
import { AddUserstoryComponent } from './sureboard/add-userstory/add-userstory.component';
import { FeaturesComponent } from './sureboard/features/features.component';
import { AddFeaturesComponent } from './sureboard/add-features/add-features.component';
import { EditFeaturesComponent } from './sureboard/edit-features/edit-features.component';
import { EditUserstoryComponent } from './sureboard/edit-userstory/edit-userstory.component';
import { QueryComponent } from './admin/query/query.component';
import { RoadmapComponent } from './sureboard/roadmap/roadmap.component';
//import { WebdatarocksPivotModule } from 'ng-webdatarocks';
import { HighchartsChartModule } from "highcharts-angular";
import { AlltypeComponent } from './sureboard/alltype/alltype.component';
import { SubmenuComponent } from './admin/submenu/submenu.component';
import {GuidedTourModule} from '../main/ngx-guided-tour/src/lib/guided-tour/guided-tour.module';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from 'ng2-ckeditor';
import { WebBuilderComponent } from './builder/web-builder/web-builder.component';
import { AddwebpageComponent } from './builder/web-builder/addwebpage/addwebpage.component';
import { AllwebpageComponent } from './builder/web-builder/allwebpage/allwebpage.component';
import { EditwebpageComponent } from './builder/web-builder/editwebpage/editwebpage.component';
import { TextAreaComponent } from './builder/web-builder/fields/text-area/text-area.component';
import { TextFieldComponent } from './builder/web-builder/fields/text-field/text-field.component';
import { EditFormComponent } from './builder/web-builder/edit-form/edit-form.component';
import { ImgFieldComponent } from './builder/web-builder/fields/img-field/img-field.component';
import { LineFieldComponent } from './builder/web-builder/fields/line-field/line-field.component';
import { QrCodeComponent } from './builder/web-builder/fields/qr-code/qr-code.component';
import { JobmanagementComponent } from './fnd/jobmanagement/jobmanagement.component';
import { DynamicformComponent } from './fnd/dynamicform/dynamicform.component';
import { AlldynamicformComponent } from './fnd/dynamicform/alldynamicform/alldynamicform.component';
import { AdddynamicformComponent } from './fnd/dynamicform/adddynamicform/adddynamicform.component';
import { EditdynamicformComponent } from './fnd/dynamicform/editdynamicform/editdynamicform.component';
import { Dynamicform1Component } from './fnd/dynamicform1/dynamicform1.component';
import { Alldynamicform1Component } from './fnd/dynamicform1/alldynamicform1/alldynamicform1.component';
import { Adddynamicform1Component } from './fnd/dynamicform1/adddynamicform1/adddynamicform1.component';
import { Editdynamicform1Component } from './fnd/dynamicform1/editdynamicform1/editdynamicform1.component';
import { ConnectorMappingComponent } from './admin/connector-mapping/connector-mapping.component';
import { TableFieldComponent } from './builder/web-builder/fields/table-field/table-field.component';
import { TagInputModule } from 'ngx-chips';
import { ExtensionComponent } from './fnd/extension/extension.component';
import { AllextensionComponent } from './fnd/extension/allextension/allextension.component';
import { AddextensionComponent } from './fnd/extension/addextension/addextension.component';
import { EditextensionComponent } from './fnd/extension/editextension/editextension.component';
import { StepperComponent } from './fnd/stepper/stepper.component';
import { AllstepperComponent } from './fnd/stepper/allstepper/allstepper.component';
import { AddstepperComponent } from './fnd/stepper/addstepper/addstepper.component';
import { EditstepperComponent } from './fnd/stepper/editstepper/editstepper.component';
import { Stepper1Component } from './fnd/stepper1/stepper1.component';
import { AllConnectorComponent } from './admin/connector-mapping/all-connector/all-connector.component';
import { AddConnectorComponent } from './admin/connector-mapping/add-connector/add-connector.component';
import { EditConnectorComponent } from './admin/connector-mapping/edit-connector/edit-connector.component';
import { SureConnectorComponent } from './admin/sure-connector/sure-connector.component';
import { DeploymentprofileComponent } from './admin/deploymentprofile/deploymentprofile.component';
import { SeedetailsComponent } from './builder/seedetails/seedetails.component';
import { FileeditorComponent } from './builder/fileeditor/fileeditor.component';
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
import { JobdefinationComponent } from './fnd/jobdefination/jobdefination.component';
import { CodeExtractionComponent } from './fnd/code-extraction/code-extraction.component';
import { CodeExtractionallComponent } from './fnd/code-extraction/code-extractionall/code-extractionall.component';
import { CodeExtractionaddComponent } from './fnd/code-extraction/code-extractionadd/code-extractionadd.component';
import { CodeExtractionParamComponent } from './fnd/code-extraction-param/code-extraction-param.component';
import { CodeExtractionParamallComponent } from './fnd/code-extraction-param/code-extraction-paramall/code-extraction-paramall.component';
import { CodeExtractionParameditComponent } from './fnd/code-extraction-param/code-extraction-paramedit/code-extraction-paramedit.component';
import { FileEditorNewComponent } from './fnd/file-editor-new/file-editor-new.component';
import { RuleLibraryComponent } from './fnd/rule-library/rule-library.component';
import { RuleLibraryallComponent } from './fnd/rule-library/rule-libraryall/rule-libraryall.component';
import { RuleLibraryaddComponent } from './fnd/rule-library/rule-libraryadd/rule-libraryadd.component';
import { RuleLibraryeditComponent } from './fnd/rule-library/rule-libraryedit/rule-libraryedit.component';
import { TechnologyStackComponent } from './fnd/technology-stack/technology-stack.component';
import { TechnologyStackallComponent } from './fnd/technology-stack/technology-stackall/technology-stackall.component';
import { TechnologyStackaddComponent } from './fnd/technology-stack/technology-stackadd/technology-stackadd.component';
import { TechnologyStackeditComponent } from './fnd/technology-stack/technology-stackedit/technology-stackedit.component';
import { CodeExtractioneditComponent } from './fnd/code-extraction/code-extractionedit/code-extractionedit.component';

import { FileEditor1Component } from './fnd/file-editor1/file-editor1.component';
import { RuleLibraryExceptionComponent } from './fnd/rule-library-exception/rule-library-exception.component';
import { RuleLibraryExceptionallComponent } from './fnd/rule-library-exception/rule-library-exceptionall/rule-library-exceptionall.component';
import { RuleLibraryExceptionaddComponent } from './fnd/rule-library-exception/rule-library-exceptionadd/rule-library-exceptionadd.component';
import { RuleLibraryExceptioneditComponent } from './fnd/rule-library-exception/rule-library-exceptionedit/rule-library-exceptionedit.component';
import { SureapiComponent } from './admin/sureapi/sureapi.component';
import { SureOpsscriptMasterComponent } from './admin/sure-opsscript-master/sure-opsscript-master.component';
import { SureOpsscriptallComponent } from './admin/sure-opsscript-master/sure-opsscriptall/sure-opsscriptall.component';
import { SureOpsscripteditComponent } from './admin/sure-opsscript-master/sure-opsscriptedit/sure-opsscriptedit.component';
import { SureOpsscriptaddComponent } from './admin/sure-opsscript-master/sure-opsscriptadd/sure-opsscriptadd.component';
import { SureOpsscriptupdateComponent } from './admin/sure-opsscript-master/sure-opsscriptupdate/sure-opsscriptupdate.component';
import { AccesstypeComponent } from './admin/accesstype/accesstype.component';
import { ModulesComponent } from './admin/modules/modules.component';
import { TechnologyelementComponent } from './fnd/technology-stack/technologyelement/technologyelement.component';
import { BuilddetailsComponent } from './builder/builddetails/builddetails.component';
import { IncomwebhookComponent } from './fnd/incomwebhook/incomwebhook.component';
import { IncomwebhookallComponent } from './fnd/incomwebhook/incomwebhookall/incomwebhookall.component';
import { IncomwebhookaddComponent } from './fnd/incomwebhook/incomwebhookadd/incomwebhookadd.component';
import { IncomwebhookeditComponent } from './fnd/incomwebhook/incomwebhookedit/incomwebhookedit.component';
import { WebhookComponent } from './fnd/webhook/webhook.component';
import { OutgoingwebhookComponent } from './fnd/outgoingwebhook/outgoingwebhook.component';
import { OutgoingwebhookallComponent } from './fnd/outgoingwebhook/outgoingwebhookall/outgoingwebhookall.component';
import { OutgoingwebhookaddComponent } from './fnd/outgoingwebhook/outgoingwebhookadd/outgoingwebhookadd.component';
import { OutgoingwebhookeditComponent } from './fnd/outgoingwebhook/outgoingwebhookedit/outgoingwebhookedit.component';
import { EditwebhookComponent } from './fnd/outgoingwebhook/editwebhook/editwebhook.component';
import { SureopsScriotmaster1Component } from './admin/sureops-scriotmaster1/sureops-scriotmaster1.component';
import { SureopsScriotmaster1allComponent } from './admin/sureops-scriotmaster1/sureops-scriotmaster1all/sureops-scriotmaster1all.component';
import { SureopsScriotmaster1addComponent } from './admin/sureops-scriotmaster1/sureops-scriotmaster1add/sureops-scriotmaster1add.component';
import { SureopsScriotmaster1editComponent } from './admin/sureops-scriotmaster1/sureops-scriotmaster1edit/sureops-scriotmaster1edit.component';
import { CookieService } from 'ngx-cookie-service';
import { SessionloggerComponent } from './admin/sessionlogger/sessionlogger.component';
import { LogreaderComponent } from './admin/logreader/logreader.component';
import { ExceptionComponent } from './admin/exception/exception.component';
import { AuditreportComponent } from './admin/auditreport/auditreport.component';
import { SchedulerlogreadfileComponent } from './fnd/schedulerlogreadfile/schedulerlogreadfile.component';
import { DatastoreComponent } from './fnd/datastore/datastore.component';
import { DatastoreallComponent } from './fnd/datastore/datastoreall/datastoreall.component';
import { DatastoreaddComponent } from './fnd/datastore/datastoreadd/datastoreadd.component';
import { DatastoreeditComponent } from './fnd/datastore/datastoreedit/datastoreedit.component';
import { DatasourceComponent } from './fnd/datasource/datasource.component';
import { DatasourceallComponent } from './fnd/datasource/datasourceall/datasourceall.component';
import { DatasourceaddComponent } from './fnd/datasource/datasourceadd/datasourceadd.component';
import { DatasourceeditComponent } from './fnd/datasource/datasourceedit/datasourceedit.component';
import { DataflowComponent } from './fnd/dataflow/dataflow.component';
import { DataflowallComponent } from './fnd/dataflow/dataflowall/dataflowall.component';
import { DataflowaddComponent } from './fnd/dataflow/dataflowadd/dataflowadd.component';
import { DatafloweditComponent } from './fnd/dataflow/dataflowedit/dataflowedit.component';
import { AudithistoryComponent } from './admin/audithistory/audithistory.component';
import { DataentityComponent } from './fnd/dataflow/dataentity/dataentity.component';
import { WebhookworkflowComponent } from './fnd/webhookworkflow/webhookworkflow.component';
import { Webhookworkflow1Component } from './fnd/webhookworkflow1/webhookworkflow1.component';
import { Dataentity1Component } from './fnd/dataflow/dataentity1/dataentity1.component';
import { Surejob1Component } from './fnd/dataflow/surejob1/surejob1.component';
import { CtemplateComponent } from './fnd/ctemplate/ctemplate.component';
import { CjobqueueComponent } from './fnd/cjobqueue/cjobqueue.component';
import { Allprojectcard2Component } from './builder/allprojectcard2/allprojectcard2.component';
import { BugtrackerComponent } from './fnd/bugtracker/bugtracker.component';
import { BugallComponent } from './fnd/bugtracker/bugall/bugall.component';
import { BugaddComponent } from './fnd/bugtracker/bugadd/bugadd.component';
import { BugeditComponent } from './fnd/bugtracker/bugedit/bugedit.component';
import { CodeworkflowComponent } from './fnd/code-extraction/codeworkflow/codeworkflow.component';
import { Gaurav_testing_tComponent } from './BuilderComponents/Gaurav_testing_tfront/Gaurav_testing_t.component';
import { Frontendtable1_tComponent } from './builder/Frontendtable1_tfront/Frontendtable1_t.component';
import { MappertableComponent } from './fnd/dataflow/mappertable/mappertable.component';
import { CodeExtractionBuilderComponent } from './fnd/code-extraction-builder/code-extraction-builder.component';
import { CodeExtractionBuilderAllComponent } from './fnd/code-extraction-builder/code-extraction-builder-all/code-extraction-builder-all.component';
import { FileEditorBuilderComponent } from './fnd/file-editor-builder/file-editor-builder.component';
import { FiltertableComponent } from './fnd/dataflow/filtertable/filtertable.component';
import { HealthCheckupComponent } from './admin/health-checkup/health-checkup.component';
import { SFTPLocationComponent } from './fnd/sftp-location/sftp-location.component';
import { SftpaddComponent } from './fnd/sftp-location/sftpadd/sftpadd.component';
import { SftpeditComponent } from './fnd/sftp-location/sftpedit/sftpedit.component';
import { SftpallComponent } from './fnd/sftp-location/sftpall/sftpall.component';
// import { SFTPLocationallComponent } from './fnd/SFTP-location/sftp-locationall/sftp-locationall.component';
// import { SFTPLocationaddComponent } from './fnd/SFTP-location/sftp-locationadd/sftp-locationadd.component';
// import { SFTPLocationeditComponent } from './fnd/SFTP-location/sftp-locationedit/sftp-locationedit.component';
import { EmailtowebhookComponent } from './fnd/emailtowebhook/emailtowebhook.component';
import { PostwebhookComponent } from './fnd/emailtowebhook/addwebhook/postwebhook.component';
import { Webhook1Component } from './fnd/emailtowebhook/editwebhook/webhook1.component';
import { GetwebhookComponent } from './fnd/emailtowebhook/getwebhook/getwebhook.component';
import { EmailtodbComponent } from './fnd/emailtodb/emailtodb.component';
import { Addwebhook1Component } from './fnd/emailtodb/addwebhook1/addwebhook1.component';
import { emaildbeditComponent } from './fnd/emailtodb/emaildbedit/emaildbedit.component';
import { WebhookallComponent } from './fnd/emailtodb/webhookall/webhookall.component';
import { DataelementComponent } from './fnd/dataflow/dataelement/dataelement.component';
import { ListbuilderComponent } from './builder/wireframe/listbuilder/listbuilder.component';
import { ListbuilderallComponent } from './builder/wireframe/listbuilder/listbuilderall/listbuilderall.component';
import { ListbuilderaddComponent } from './builder/wireframe/listbuilder/listbuilderadd/listbuilderadd.component';
import { ListbuildereditComponent } from './builder/wireframe/listbuilder/listbuilderedit/listbuilderedit.component';
import { ListbuilderLineComponent } from './builder/wireframe/listbuilder/listbuilder-line/listbuilder-line.component';
import { QueryRunner1Component } from './fnd/query-runner1/query-runner1.component';
@NgModule({
  declarations: [
    MainPageComponent, PageNotFoundComponent,AboutComponent, LayoutComponent, UserComponent,PasswordResetComponent,UniversityComponent,
     DashboardComponent, OrderstatComponent,MenuGroupComponent, AllMenuGroupComponent, EditMenuGroupComponent, ReadOnlyMenuGroupComponent,
   MenuRegisterComponent, AddMenurComponent, EditMenurComponent, AllMenurComponent, ReadonlyMenurComponent,ProfileSettingComponent,
    UsermaintanceComponent, UsermaintanceaddComponent, UsermaintanceeditComponent, UsergrpmaintenanceComponent, MenuaccesscontrolComponent,
    LogconfigComponent, ScheduleComponent,SchedulepipelineComponent, ScheduleInfoComponent, SystemparametersComponent,
   MenumaintanceComponent,DocumentmasterComponent,DocumentreferenceComponent,DocumentstructureComponent,Projectsetup1Component,ProjectcardComponent,
  ProjectsetupComponent,AddprojectsetupComponent, AllprojectsetupComponent, EditprojectsetupComponent,ModuleSetup1Component,ModuleCardComponent,
  ModuleSetupComponent,AddmoduleSetupComponent,AllmoduleSetupComponent,EditmoduleSetupComponent,WireframeComponent, AllwireframeComponent,
  AddwireframeComponent,EditwireframeComponent,Edit2wireframeComponent,UpdateWireframeComponent,WireframetypeComponent,PropertiesComponent,
  PropertyComponent,UinameeditComponent,ActionsComponent,SuredocrComponent,SurefarmComponent,SuregitComponent,Wireframe1Component,
  WireframeCardComponent,Report2Component,ReporttypeComponent,ReportBuilderComponent,AddComponent,AllComponent,EditComponent,
  RbTableSetupComponent,RbColumnSetupComponent,RbWhereColumnSetupComponent,RbDateParamSetupComponent,ScienceComponent, ProjectviewComponent, AllprojectComponent, AllprojectcardComponent, SurebuilderComponent, SureboardComponent, MyworkspaceComponent, UserRegistrationComponent, GitfolderComponent, Gitfolder1Component, GitfileComponent, Gitfile1Component, Gitfolder2Component, SureboardRuleComponent, AddruleBoardComponent, AddruleSureboardComponent, AddGoalComponent, AddIterationComponent, AddMilestoneComponent, GoalComponent, IterationReleaseComponent, MilestoneComponent, RbAdhocParamSetupComponent, RbStdParamComponent, RbQueryBuildComponent, QueryRunnerComponent, SelectBiComponent, BiWidgetsComponent, AddWidgetComponent, AllWidgetComponent, EditWidgetsComponent, BiDashboardComponent, AllDashComponent, AddDashComponent, EditDashComponent, AddDefinationComponent, UpdateWidgetModalComponent, Test19Component, ActionBuilderComponent, ActionBuilderLineComponent, AllActionComponent, AllActionBuilderLineComponent, AddActionBuilderLineComponent, EditActionBuilderLineComponent, AddActionComponent, EditActionComponent, Allreport2Component, Addreport2Component, Editreport2Component, AllrepoComponent, RecentlymodifiedComponent, RecentlyarchivedComponent, MyfavComponent, OauthComponent, SureconnectComponent, EditsureconnectComponent, NcsoComponent, BoardComponent, DashbComponent, ManagemenComponent, DashboardnewComponent, AllnewdashComponent, AddnewdashComponent, EditnewdashComponent, DoughnutChartComponent, LineChartComponent, RadarChartComponent, BarChartComponent, BubbleChartComponent, DynamicChartComponent, ScatterChartComponent, PolarChartComponent, PieChartComponent, FinancialChartComponent, ToDoChartComponent, EditruleBoardComponent, SurepipeComponent, AddpipeComponent, SurepipeeditComponent, PivotReportComponent, WorkflowComponent, AddworkflowComponent, AllworkflowComponent, EditworkflowComponent, UpdateWorkflowComponent, EditIterationComponent, EditMilestoneComponent, EditGoalComponent, UserstoryComponent, AddUserstoryComponent, FeaturesComponent, AddFeaturesComponent, EditFeaturesComponent, EditUserstoryComponent, QueryComponent, RoadmapComponent, AlltypeComponent, SubmenuComponent, WebBuilderComponent, AddwebpageComponent, AllwebpageComponent, EditwebpageComponent, TextAreaComponent, TextFieldComponent, EditFormComponent, ImgFieldComponent, LineFieldComponent, QrCodeComponent, JobmanagementComponent, DynamicformComponent, AlldynamicformComponent, AdddynamicformComponent, EditdynamicformComponent, Dynamicform1Component, Alldynamicform1Component, Adddynamicform1Component, Editdynamicform1Component, ConnectorMappingComponent, TableFieldComponent, ExtensionComponent, AllextensionComponent, AddextensionComponent, EditextensionComponent, StepperComponent, AllstepperComponent, AddstepperComponent, EditstepperComponent, Stepper1Component, AllConnectorComponent, AddConnectorComponent, EditConnectorComponent, SureConnectorComponent, DeploymentprofileComponent, SeedetailsComponent,FileeditorComponent, JobdefinationComponent, CodeExtractionComponent, CodeExtractionallComponent, CodeExtractionaddComponent, CodeExtractionParamComponent, CodeExtractionParamallComponent, CodeExtractionParameditComponent, FileEditorNewComponent, RuleLibraryComponent, RuleLibraryallComponent, RuleLibraryaddComponent, RuleLibraryeditComponent, TechnologyStackComponent, TechnologyStackallComponent, TechnologyStackaddComponent, TechnologyStackeditComponent, CodeExtractioneditComponent,  FileEditor1Component, RuleLibraryExceptionComponent, RuleLibraryExceptionallComponent, RuleLibraryExceptionaddComponent, RuleLibraryExceptioneditComponent, SureapiComponent, SureOpsscriptMasterComponent, SureOpsscriptallComponent, SureOpsscripteditComponent, SureOpsscriptaddComponent, SureOpsscriptupdateComponent, AccesstypeComponent, ModulesComponent, TechnologyelementComponent, BuilddetailsComponent, IncomwebhookComponent, IncomwebhookallComponent, IncomwebhookaddComponent, IncomwebhookeditComponent, WebhookComponent, OutgoingwebhookComponent, OutgoingwebhookallComponent, OutgoingwebhookaddComponent, OutgoingwebhookeditComponent, EditwebhookComponent, SureopsScriotmaster1Component, SureopsScriotmaster1allComponent, SureopsScriotmaster1addComponent, SureopsScriotmaster1editComponent, SessionloggerComponent, LogreaderComponent, ExceptionComponent, AuditreportComponent, SchedulerlogreadfileComponent, DatastoreComponent, DatastoreallComponent, DatastoreaddComponent, DatastoreeditComponent, DatasourceComponent, DatasourceallComponent, DatasourceaddComponent, DatasourceeditComponent, DataflowComponent, DataflowallComponent, DataflowaddComponent, DatafloweditComponent, AudithistoryComponent, DataentityComponent, WebhookworkflowComponent, Webhookworkflow1Component, Dataentity1Component, Surejob1Component, CtemplateComponent, CjobqueueComponent, Allprojectcard2Component, BugtrackerComponent, BugallComponent, BugaddComponent, BugeditComponent, CodeworkflowComponent,
  EmailtowebhookComponent,PostwebhookComponent,Webhook1Component,GetwebhookComponent,EmailtodbComponent,Addwebhook1Component,emaildbeditComponent,WebhookallComponent,
  // buildercomponents
Gnyandipta_tComponent,






    Gaurav_testing_tComponent,Frontendtable1_tComponent, MappertableComponent, CodeExtractionBuilderComponent, CodeExtractionBuilderAllComponent, FileEditorBuilderComponent, FiltertableComponent, HealthCheckupComponent, SFTPLocationComponent,SftpaddComponent,SftpeditComponent,SftpallComponent, DataelementComponent, ListbuilderComponent, ListbuilderallComponent, ListbuilderaddComponent, ListbuildereditComponent, ListbuilderLineComponent, QueryRunner1Component,



























  ],
  entryComponents: [DoughnutChartComponent, LineChartComponent, RadarChartComponent, BarChartComponent, BubbleChartComponent, DynamicChartComponent, ScatterChartComponent, PolarChartComponent, PieChartComponent, FinancialChartComponent, ToDoChartComponent,
    TextAreaComponent,ImgFieldComponent,LineFieldComponent,QrCodeComponent,TableFieldComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    HelperModule,
    MainRoutingModule,
    DragDropModule,
    DndModule,
    HttpClientModule,
    ImageCropperModule,
    HighchartsChartModule,
    TagInputModule,
   // QueryBuilderModule,
// Thirdparty Module
//WebdatarocksPivotModule,
CodemirrorModule,
NgxDatatableModule,
NgxChartsModule,
Ng2SearchPipeModule,
DynamicModule.withComponents([DoughnutChartComponent, RadarChartComponent, LineChartComponent,BarChartComponent,PieChartComponent,
  PolarChartComponent,BubbleChartComponent,ScatterChartComponent,DynamicChartComponent,FinancialChartComponent,ToDoChartComponent,
  TextAreaComponent,ImgFieldComponent,LineFieldComponent,QrCodeComponent,TableFieldComponent]),
GridsterModule,
ChartsModule,
CKEditorModule,
GuidedTourModule.forRoot(),
  ],
  providers: [
    CookieService,

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MainModule { }