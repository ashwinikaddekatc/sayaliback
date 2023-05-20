import { Gnyandipta_tComponent } from './BuilderComponents/Gnyandipta_tfront/Gnyandipta_t.component';



import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from '../main/fnd/main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from '../main/admin/about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from '../main/admin/user/user.component';
import { UniversityComponent } from '../main/fnd/university/university.component';
import { PasswordResetComponent } from '../main/admin/password-reset/password-reset.component';
import { DashboardComponent } from '../main/fnd/dashboard/dashboard.component';
import { OrderstatComponent } from '../main/fnd/orderstat/orderstat.component';
import { AllMenuGroupComponent } from '../main/admin/menu-group/all/all-menu-group.component';

import { EditMenuGroupComponent } from '../main/admin/menu-group/edit/edit-menu-group.component';
import { MenuGroupComponent } from '../main/admin/menu-group/menu-group.component';
import { ReadOnlyMenuGroupComponent } from '../main/admin/menu-group/read-only/readonly-menu-group.component';
import { MenuRegisterComponent } from '../main/admin/menu-register/menu-register.component';
import { AllMenurComponent } from '../main/admin/menu-register/all-menur/all-menur.component';
import { AddMenurComponent } from '../main/admin/menu-register/add-menur/add-menur.component';
import { EditMenurComponent } from '../main/admin/menu-register/edit-menur/edit-menur.component';
import { ReadonlyMenurComponent } from '../main/admin/menu-register/readonly-menur/readonly-menur.component';
import { ProfileSettingComponent } from '../main/admin/profile-setting/profile-setting.component';
import { UsermaintanceComponent } from '../main/admin/usermaintance/usermaintance.component';
import { UsermaintanceaddComponent } from '../main/admin/usermaintanceadd/usermaintanceadd.component';
import { UsermaintanceeditComponent } from '../main/admin/usermaintanceedit/usermaintanceedit.component';
import { UsergrpmaintenanceComponent } from '../main/admin/usergrpmaintenance/usergrpmaintenance.component';
import { MenuaccesscontrolComponent } from '../main/admin/menuaccesscontrol/menuaccesscontrol.component';
import { LogconfigComponent } from '../main/admin/logconfig/logconfig.component';
import { AuthGuard } from '../../services/auth_guard.service';
import { ScheduleComponent } from '../main/fnd/schedule/schedule.component';
import { SchedulepipelineComponent } from '../main/fnd/schedulepipeline/schedulepipeline.component';
import { ScheduleInfoComponent } from '../main/fnd/schedule-info/schedule-info.component';
import { SystemparametersComponent } from '../main/admin/systemparameters/systemparameters.component';
import { MenumaintanceComponent } from '../main/admin/menumaintance/menumaintance.component';
import { DocumentmasterComponent } from '../main/admin/documentmaster/documentmaster.component';
import { DocumentreferenceComponent } from '../main/admin/documentreference/documentreference.component';
import { DocumentstructureComponent } from '../main/admin/documentstructure/documentstructure.component';
import { Projectsetup1Component } from '../main/builder/projectsetup1/projectsetup1.component';
import { ProjectsetupComponent } from '../main/builder/projectsetup/projectsetup.component';
import { AllprojectsetupComponent } from '../main/builder/projectsetup/allprojectsetup/allprojectsetup.component';
import { AddprojectsetupComponent } from '../main/builder/projectsetup/addprojectsetup/addprojectsetup.component';
import { EditprojectsetupComponent } from '../main/builder/projectsetup/editprojectsetup/editprojectsetup.component';
import { ModuleSetup1Component } from '../main/builder/module-setup1/module-setup1.component';
import { ModuleSetupComponent } from '../main/builder/module-setup/module-setup.component';
import { AllmoduleSetupComponent } from '../main/builder/module-setup/allmodule-setup/allmodule-setup.component';
import { AddmoduleSetupComponent } from '../main/builder/module-setup/addmodule-setup/addmodule-setup.component';
import { EditmoduleSetupComponent } from '../main/builder/module-setup/editmodule-setup/editmodule-setup.component';
import { WireframeComponent } from '../main/builder/wireframe/wireframe.component';
import { AllwireframeComponent } from '../main/builder/wireframe/allwireframe/allwireframe.component';
import { AddwireframeComponent } from '../main/builder/wireframe/addwireframe/addwireframe.component';
import { WireframetypeComponent } from '../main/builder/wireframe/wireframetype/wireframetype.component';
import { EditwireframeComponent } from '../main/builder/wireframe/editwireframe/editwireframe.component';
import { Edit2wireframeComponent } from '../main/builder/wireframe/edit2wireframe/edit2wireframe.component';
import { UpdateWireframeComponent } from '../main/builder/wireframe/update-wireframe/update-wireframe.component';
import { PropertyComponent } from '../main/builder/wireframe/property/property.component';
import { PropertiesComponent } from '../main/builder/wireframe/properties/properties.component';
import { UinameeditComponent } from '../main/builder/wireframe/uinameedit/uinameedit.component';
import { ActionsComponent } from '../main/builder/wireframe/actions/actions.component';
import { Wireframe1Component } from '../main/builder/wireframe1/wireframe1.component';
import { ReportBuilderComponent } from '../main/builder/report-builder/report-builder.component';
import { AllComponent } from '../main/builder/report-builder/all/all.component';
import { AddComponent } from '../main/builder/report-builder/add/add.component';
import { EditComponent } from '../main/builder/report-builder/edit/edit.component';
import { ReporttypeComponent } from '../main/fnd/report2/reporttype/reporttype.component';
import { RbTableSetupComponent } from '../main/fnd/rb-table-setup/rb-table-setup.component';
import { ScienceComponent } from '../main/fnd/science/science.component';
import { ProjectcardComponent } from '../main/builder/projectcard/projectcard.component';
import { ModuleCardComponent } from '../main/builder/module-card/module-card.component';
import { ProjectviewComponent } from '../main/builder/module-setup/projectview/projectview.component';
import { AllprojectComponent } from '../main/builder/allproject/allproject.component';
import { AllprojectcardComponent } from '../main/builder/allprojectcard/allprojectcard.component';
import { SureboardComponent } from './sureboard/sureboard/sureboard.component';
import { MyworkspaceComponent } from '../main/admin/myworkspace/myworkspace.component';
import { GitfolderComponent } from '../main/builder/gitfolder/gitfolder.component';
import { Gitfolder1Component } from '../main/builder/gitfolder1/gitfolder1.component';
import { GitfileComponent } from '../main/builder/gitfile/gitfile.component';
import { Gitfile1Component } from '../main/builder/gitfile1/gitfile1.component';
import { Gitfolder2Component } from '../main/builder/gitfolder2/gitfolder2.component';
import { SureboardRuleComponent } from './sureboard/sureboard-rule/sureboard-rule.component';
import { AddruleBoardComponent } from './sureboard/addrule-board/addrule-board.component';
import { AddruleSureboardComponent } from './sureboard/addrule-sureboard/addrule-sureboard.component';
import { GoalComponent } from './sureboard/goal/goal.component';
import { AddGoalComponent } from './sureboard/add-goal/add-goal.component';
import { MilestoneComponent } from './sureboard/milestone/milestone.component';
import { AddMilestoneComponent } from './sureboard/add-milestone/add-milestone.component';
import { IterationReleaseComponent } from './sureboard/iteration-release/iteration-release.component';
import { AddIterationComponent } from './sureboard/add-iteration/add-iteration.component';
import { RbColumnSetupComponent } from './fnd/rb-column-setup/rb-column-setup.component';
import { RbWhereColumnSetupComponent } from './fnd/rb-where-column-setup/rb-where-column-setup.component';
import { RbDateParamSetupComponent } from './fnd/rb-date-param-setup/rb-date-param-setup.component';
import { RbAdhocParamSetupComponent } from './fnd/rb-adhoc-param-setup/rb-adhoc-param-setup.component';
import { RbStdParamComponent } from './fnd/rb-std-param/rb-std-param.component';
import { RbQueryBuildComponent } from './fnd/rb-query-build/rb-query-build.component';
import { QueryRunnerComponent } from './fnd/query-runner/query-runner.component';
import { SelectBiComponent } from './fnd/select-bi/select-bi.component';
import { BiWidgetsComponent } from './fnd/bi-widgets/bi-widgets.component';
import { AllWidgetComponent } from './fnd/bi-widgets/all-widget/all-widget.component';
import { AddWidgetComponent } from './fnd/bi-widgets/add-widget/add-widget.component';
import { EditWidgetsComponent } from './fnd/bi-widgets/edit-widgets/edit-widgets.component';
import { BiDashboardComponent } from './fnd/bi-dashboard/bi-dashboard.component';
import { AllDashComponent } from './fnd/bi-dashboard/all-dash/all-dash.component';
import { AddDashComponent } from './fnd/bi-dashboard/add-dash/add-dash.component';
import { EditDashComponent } from './fnd/bi-dashboard/edit-dash/edit-dash.component';
import { AddDefinationComponent } from './fnd/bi-dashboard/add-defination/add-defination.component';
import { UpdateWidgetModalComponent } from './fnd/bi-dashboard/update-widget-modal/update-widget-modal.component';
import { Test19Component } from './fnd/test19/test19.component';
import { ActionBuilderComponent } from './fnd/action-builder/action-builder.component';
import { AllActionComponent } from './fnd/action-builder/all-action/all-action.component';
import { ActionBuilderLineComponent } from './fnd/action-builder/action-builder-line/action-builder-line.component';
import { AllActionBuilderLineComponent } from './fnd/action-builder/action-builder-line/all-action-builder-line/all-action-builder-line.component';
import { AddActionBuilderLineComponent } from './fnd/action-builder/action-builder-line/add-action-builder-line/add-action-builder-line.component';
import { EditActionBuilderLineComponent } from './fnd/action-builder/action-builder-line/edit-action-builder-line/edit-action-builder-line.component';
import { EditActionComponent } from './fnd/action-builder/edit-action/edit-action.component';
import { AddActionComponent } from './fnd/action-builder/add-action/add-action.component';
import { Report2Component } from './fnd/report2/report2.component';
import { Allreport2Component } from './fnd/report2/allreport2/allreport2.component';
import { Addreport2Component } from './fnd/report2/addreport2/addreport2.component';
import { Editreport2Component } from './fnd/report2/editreport2/editreport2.component';
import { WireframeCardComponent } from './builder/wireframe-card/wireframe-card.component';
import { AllrepoComponent } from './builder/allrepo/allrepo.component';
import { RecentlymodifiedComponent } from './builder/recentlymodified/recentlymodified.component';
import { RecentlyarchivedComponent } from './builder/recentlyarchived/recentlyarchived.component';
import { MyfavComponent } from './builder/myfav/myfav.component';
import { OauthComponent } from './admin/oauth/oauth.component';
import { SureconnectComponent } from './admin/sureconnect/sureconnect.component';
import { EditsureconnectComponent } from './admin/editsureconnect/editsureconnect.component';
import { NcsoComponent } from './fnd/ncso/ncso.component';
import { BoardComponent } from './fnd/board/board.component';
import { DashbComponent } from './fnd/dashb/dashb.component';
import { ManagemenComponent } from './admin/managemen/managemen.component';
import { DashboardnewComponent } from './builder/dashboardnew/dashboardnew.component';
import { AllnewdashComponent } from './builder/dashboardnew/allnewdash/allnewdash.component';
import { AddnewdashComponent } from './builder/dashboardnew/addnewdash/addnewdash.component';
import { EditnewdashComponent } from './builder/dashboardnew/editnewdash/editnewdash.component';
import { EditruleBoardComponent } from './sureboard/editrule-board/editrule-board.component';
import { AddpipeComponent } from './builder/addpipe/addpipe.component';
import { SurepipeeditComponent } from './builder/surepipeedit/surepipeedit.component';
import { PivotReportComponent } from './builder/pivot-report/pivot-report.component';
import { WorkflowComponent } from './fnd/workflow/workflow.component';
import { AllworkflowComponent } from './fnd/workflow/allworkflow/allworkflow.component';
import { AddworkflowComponent } from './fnd/workflow/addworkflow/addworkflow.component';
import { EditworkflowComponent } from './fnd/workflow/editworkflow/editworkflow.component';
import { UpdateWorkflowComponent } from './fnd/workflow/update-workflow/update-workflow.component';
import { EditIterationComponent } from './sureboard/edit-iteration/edit-iteration.component';
import { EditMilestoneComponent } from './sureboard/edit-milestone/edit-milestone.component';
import { EditGoalComponent } from './sureboard/edit-goal/edit-goal.component';
import { UserstoryComponent } from './sureboard/userstory/userstory.component';
import { AddUserstoryComponent } from './sureboard/add-userstory/add-userstory.component';
import { FeaturesComponent } from './sureboard/features/features.component';
import { AddFeaturesComponent } from './sureboard/add-features/add-features.component';
import { EditUserstoryComponent } from './sureboard/edit-userstory/edit-userstory.component';
import { EditFeaturesComponent } from './sureboard/edit-features/edit-features.component';
import { QueryComponent } from './admin/query/query.component';
import { RoadmapComponent } from './sureboard/roadmap/roadmap.component';
import { AlltypeComponent } from './sureboard/alltype/alltype.component';
import { SubmenuComponent } from './admin/submenu/submenu.component';
import { WebBuilderComponent } from './builder/web-builder/web-builder.component';
import { AllwebpageComponent } from './builder/web-builder/allwebpage/allwebpage.component';
import { AddwebpageComponent } from './builder/web-builder/addwebpage/addwebpage.component';
import { EditwebpageComponent } from './builder/web-builder/editwebpage/editwebpage.component';
import { EditFormComponent } from './builder/web-builder/edit-form/edit-form.component';
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
import { Role } from '../../models/admin/role';
import { SureConnectorComponent } from './admin/sure-connector/sure-connector.component';
import { DeploymentprofileComponent } from './admin/deploymentprofile/deploymentprofile.component';
import { SeedetailsComponent } from './builder/seedetails/seedetails.component';
import { FileeditorComponent } from './builder/fileeditor/fileeditor.component';
import { JobdefinationComponent } from './fnd/jobdefination/jobdefination.component';
import { CodeExtractionComponent } from './fnd/code-extraction/code-extraction.component';
import { CodeExtractionallComponent } from './fnd/code-extraction/code-extractionall/code-extractionall.component';
import { CodeExtractionaddComponent } from './fnd/code-extraction/code-extractionadd/code-extractionadd.component';
import { CodeExtractionParamComponent } from './fnd/code-extraction-param/code-extraction-param.component';
import { CodeExtractionParamallComponent } from './fnd/code-extraction-param/code-extraction-paramall/code-extraction-paramall.component';
import { CodeExtractionParameditComponent } from './fnd/code-extraction-param/code-extraction-paramedit/code-extraction-paramedit.component';
import { FileEditorNewComponent } from './fnd/file-editor-new/file-editor-new.component';
import { CodeExtractionBuilderComponent } from './fnd/code-extraction-builder/code-extraction-builder.component';
import { CodeExtractionBuilderAllComponent } from './fnd/code-extraction-builder/code-extraction-builder-all/code-extraction-builder-all.component';
import { FileEditorBuilderComponent } from './fnd/file-editor-builder/file-editor-builder.component';

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
import { FiltertableComponent } from './fnd/dataflow/filtertable/filtertable.component';
import { HealthCheckupComponent } from './admin/health-checkup/health-checkup.component';
import { SFTPLocationComponent } from './fnd/sftp-location/sftp-location.component';
import { SftpaddComponent } from './fnd/sftp-location/sftpadd/sftpadd.component';
import { SftpeditComponent } from './fnd/sftp-location/sftpedit/sftpedit.component';
import { SftpallComponent } from './fnd/sftp-location/sftpall/sftpall.component';
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
import { ListbuilderaddComponent } from './builder/wireframe/listbuilder/listbuilderadd/listbuilderadd.component';
import { ListbuilderallComponent } from './builder/wireframe/listbuilder/listbuilderall/listbuilderall.component';
import { ListbuildereditComponent } from './builder/wireframe/listbuilder/listbuilderedit/listbuilderedit.component';
import { ListbuilderLineComponent } from './builder/wireframe/listbuilder/listbuilder-line/listbuilder-line.component';
import { QueryRunner1Component } from './fnd/query-runner1/query-runner1.component';
import { ReportBuildComponent } from './builder/report-build/report-build.component';
import { DatefunctionComponent } from './fnd/datefunction/datefunction.component';


const routes: Routes = [
   //Important: The sequence of path is important as the router go over then in sequential manner
   { path: '', redirectTo: '/cns-portal/dashboard', pathMatch: 'full' },
  {
    path: 'cns-portal',
    component: LayoutComponent,
     canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'main', component: MainPageComponent },
      { path: 'user', component: UserComponent},
      {path: 'scheduler', component:  ScheduleComponent},
      {path: 'pipeline', component:  SchedulepipelineComponent},
      {path: 'scheduleinfo', component:  ScheduleInfoComponent},
      {path: 'jobmanagement', component:JobmanagementComponent},
      { path: 'gotojobdefination/:id', component:JobdefinationComponent},
      {path:'university',component:UniversityComponent},
      {path: 'board',component:BoardComponent},
      {path: 'usermaintance',component:UsermaintanceComponent},
      {path: 'usermaintanceadd',component:UsermaintanceaddComponent},
      {path: 'usermaintancedit/:id',component:UsermaintanceeditComponent},
      {path: 'usergrpmaintance',component:UsergrpmaintenanceComponent},
      {path: 'menuaccess',component:MenuaccesscontrolComponent},
      {path: 'systemparameters', component: SystemparametersComponent},
      {path: 'query',component:QueryComponent,canActivate: [AuthGuard],data: { roles: [Role.Admin] } },
      {path: 'menumaintance', component:MenumaintanceComponent},
      {path: 'submenu/:id',component:SubmenuComponent},
      {path: 'documnetmaster', component:DocumentmasterComponent},
      {path: 'documentreference', component:DocumentreferenceComponent},
      {path: 'documentstructure', component:DocumentstructureComponent},
      {path:'gitfolder',component:GitfolderComponent},
      {path:'gitfolder1',component:Gitfolder1Component},
      {path:'deploymentprofile',component:DeploymentprofileComponent},
      {path:'gitfolder2',component:Gitfolder2Component},
      {path:'gitfile',component:GitfileComponent},
      {path:'gitfile1',component:Gitfile1Component},
      {path: 'sure-connector', component:SureConnectorComponent},
     // {path: 'lazy' , component:LazyloadingComponent},
     {path: 'roadmap',component:RoadmapComponent},
     {path: 'seedetails',component:SeedetailsComponent},
     {path: 'addpipe',component:AddpipeComponent},
     {path:'pivot-report',component:PivotReportComponent},
     {path: 'surepipeedit/:id',component:SurepipeeditComponent},
      {path:'log',component:LogconfigComponent},
      {path: 'ncso', component:NcsoComponent},
      {path: 'manageteam/:id',component:ManagemenComponent},
     { path: 'passwordreset', component: PasswordResetComponent },
     { path: 'profile-settings', component: ProfileSettingComponent },
      { path: 'about', component: AboutComponent },
      {path:'project1',component:Projectsetup1Component},
      {path: 'projectcard', component:ProjectcardComponent},
      {path:'module1',component:ModuleSetup1Component},
      {path: 'modules', component:AllmoduleSetupComponent},
      {path: 'modulecard', component:ModuleCardComponent},
      {path: 'wireframecard', component: WireframeCardComponent},
      { path: 'actions', component: ActionsComponent },
      { path: 'wireframe', component: Wireframe1Component },
      {path: 'sureboard', component:SureboardComponent},
      {path: 'types',component:AlltypeComponent},
      {path:'sureboard-rules',component:SureboardRuleComponent},
      {path:'addruleboard',component:AddruleBoardComponent},
      {path: 'addrule',component:AddruleSureboardComponent},
      {path: 'editrule/:id',component:EditruleBoardComponent},
      {path: 'user-story',component:UserstoryComponent},
      {path: 'add-userstory',component:AddUserstoryComponent},
      {path: 'edit-userstory/:id',component:EditUserstoryComponent},
      {path: 'features',component:FeaturesComponent},
      {path: 'add-features',component:AddFeaturesComponent},
      {path: 'edit-features/:id',component:EditFeaturesComponent},
      {path: 'goal',component:GoalComponent},
      {path: 'add-goal',component:AddGoalComponent},
      {path: 'edit-goal/:id',component:EditGoalComponent},
      {path: 'milestone',component:MilestoneComponent},
      {path: 'add-milstone',component:AddMilestoneComponent},
      {path: 'edit-milstone/:id',component:EditMilestoneComponent},
      {path: 'iteration',component:IterationReleaseComponent},
      {path: 'add-iteration',component:AddIterationComponent},
      {path: 'edit-iteration/:id',component:EditIterationComponent},
      {path: 'myworkspace', component:MyworkspaceComponent},
      {path: 'reporttype'   , component: ReporttypeComponent},
      {path: 'allproject', component: AllprojectComponent},
      {path: 'allrepo', component:AllrepoComponent},
      {path: 'recentlymodify', component:RecentlymodifiedComponent},
      {path: 'recentlyarchived', component:RecentlyarchivedComponent},
      {path: 'allprojectcard2', component:AllprojectcardComponent},
      {path: 'allprojectcard3', component:Allprojectcard2Component},
      {path:'bi-build' , component: SelectBiComponent },
      {path: 'oauth', component:OauthComponent},
      {path:'sureconnect', component:SureconnectComponent},
      {path:'webhook',component:WebhookComponent},
      {path:'webhookworkflow',component:WebhookworkflowComponent},
      {path:'webhookworkflow1/:id',component:Webhookworkflow1Component},
      {path:'sureapi', component:SureapiComponent},
      {path: 'editconnect/:id', component:EditsureconnectComponent},
      {path: 'fileeditor',component:FileeditorComponent},
      {path: 'logreader',component:LogreaderComponent},
      {path: 'allfav', component:MyfavComponent},
      {path: 'schedulerlogreader',component:SchedulerlogreadfileComponent},
      {path: 'stepper1',component:Stepper1Component},
      {path: 'dash/:id',component:DashbComponent},
      {path: 'accesstype',component:AccesstypeComponent},
      {path: 'acmodules',component:ModulesComponent},
      {path: 'sessionlogger',component:SessionloggerComponent},
      {path: 'exception',component:ExceptionComponent},
     {path: 'template',component:CtemplateComponent},
     {path:'jobqueue',component:CjobqueueComponent},
      {path: 'builddetails',component:BuilddetailsComponent},
      {path: 'auditreport',component:AuditreportComponent},
      {path: 'audithistory/:id',component:AudithistoryComponent},
      {path: 'CloudNsureServices', component:HealthCheckupComponent},
     {path:'rerunner',component:DatefunctionComponent},




     {path:'bugtracker',component:BugtrackerComponent,
     children: [
      { path: '', redirectTo: 'bugall', pathMatch: 'full' },
      { path: 'bugall', component:BugallComponent },
      {path:'bugadd',component:BugaddComponent},
      {path: 'bugedit/:id',component:BugeditComponent},

    ]},


      {path: 'dashboard', component:DashboardComponent,
      children: [
        { path: '', redirectTo: 'order', pathMatch: 'full' },
        { path: 'order', component: OrderstatComponent },

      ]
    },

    // buildercomponents
{path:'Gnyandipta_t',component:Gnyandipta_tComponent},






    {path: 'gaurav_testing', component: Gaurav_testing_tComponent},
    {path: 'Frontendtable1_t', component: Frontendtable1_tComponent},






















//  {path:'form_name..._',component:form_name_Component},

{path: 'datastore',component: DatastoreComponent,
children: [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  {path: 'all',component: DatastoreallComponent},
  {path: 'add',component: DatastoreaddComponent},
 {path: 'edit/:id',component: DatastoreeditComponent},
],
},
{path: 'datasource',component: DatasourceComponent,
children: [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  {path: 'all',component: DatasourceallComponent},
  {path: 'add',component: DatasourceaddComponent},
 {path: 'edit/:id',component: DatasourceeditComponent},
],
},
{path: 'sftplocation',component: SFTPLocationComponent,
  children:[
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    {path: 'all',component: SftpallComponent},
    {path: 'add',component: SftpaddComponent},
    {path: 'edit/:id',component: SftpeditComponent},
  ]
},
{path: 'emailtowebhook',component: EmailtowebhookComponent,
  children:[
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    {path: 'all',component: GetwebhookComponent},
    {path: 'add',component: PostwebhookComponent},
    {path: 'edit/:id',component: Webhook1Component},
  ]
},
{path: 'emailtodb',component: EmailtodbComponent,
  children:[
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    {path: 'all',component: WebhookallComponent},
    {path: 'add',component: Addwebhook1Component},
    {path: 'edit/:id',component: emaildbeditComponent},
  ]
},
{path: 'dataflow',component: DataflowComponent,
children: [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  {path: 'all',component: DataflowallComponent},
  {path: 'add',component: DataflowaddComponent},
 {path: 'edit/:id',component: DatafloweditComponent},
 {path: 'gotoentity/:id',component:DataentityComponent},
 {path: 'gotoentity1/:id',component:Dataentity1Component},
 {path: 'gotoelement/:id',component:DataelementComponent},
 {path: 'surejob',component:Surejob1Component},
 {path: 'mapperTable', component:MappertableComponent},
 {path: 'filterTable', component:FiltertableComponent}
],
},
{path: 'incomingwebhook',component: IncomwebhookComponent,
children: [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  {path: 'all',component: IncomwebhookallComponent},
  {path: 'add',component: IncomwebhookaddComponent},
 {path: 'edit/:id',component: IncomwebhookeditComponent},
],
},
{path: 'outgoingwebhook',component: OutgoingwebhookComponent,
children: [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  {path: 'all',component: OutgoingwebhookallComponent},
  {path: 'add',component: OutgoingwebhookaddComponent},
 {path: 'edit/:id',component: OutgoingwebhookeditComponent},
 { path: 'editwebhook/:id', component: EditwebhookComponent},
],
},
// EXTENSION FIELDS
      // university/add/extension
      {path:'extension',component: ExtensionComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          {path: 'all',component: AllextensionComponent},
          {path: 'add',component: AddextensionComponent},
         {path: 'edit/:id',component: EditextensionComponent},
        ],
      },
      {path:'stepper',component:StepperComponent,
      children: [
        { path: '', redirectTo: 'all', pathMatch: 'full' },
        { path: 'all', component: AllstepperComponent },
        { path: 'add', component: AddstepperComponent },
        { path: 'edit/:id', component: EditstepperComponent },
      ]
    },
    {path:'sureopsscriptmaster',component:SureOpsscriptMasterComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: SureOpsscriptallComponent },
      { path: 'add', component: SureOpsscriptaddComponent },
      { path: 'edit/:id', component: SureOpsscripteditComponent },
      { path: 'editscript/:id', component: SureOpsscriptupdateComponent },
    ]
  },
  {path:'sureopsscriptmaster1',component:SureopsScriotmaster1Component,
  children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component:SureopsScriotmaster1allComponent },
    { path: 'add', component: SureopsScriotmaster1addComponent },
    { path: 'edit/:id', component: SureopsScriotmaster1editComponent },
  ]
},
    {
      path:'connectormapping',component:ConnectorMappingComponent,
      children:[
        { path: '', redirectTo: 'all', pathMatch: 'full' },
        { path: 'all', component: AllConnectorComponent},
        { path: 'add', component :AddConnectorComponent },
        { path: 'edit/:id', component: EditConnectorComponent },

      ]
    },

{
  path:'dynamicform',component:DynamicformComponent,
  children:[
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: AlldynamicformComponent},
    { path: 'add', component :AdddynamicformComponent },
    { path: 'edit/:id', component: EditdynamicformComponent },

  ]
},
{
  path:'dynamicform1',component:Dynamicform1Component,
  children:[
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: Alldynamicform1Component},
    { path: 'add', component :Adddynamicform1Component },
    { path: 'edit/:id', component: Editdynamicform1Component },

  ]
},
    {
      path:'workflow',component:WorkflowComponent,
      children:[
        { path: '', redirectTo: 'all', pathMatch: 'full' },
        { path: 'all', component: AllworkflowComponent},
        { path: 'add', component :AddworkflowComponent },
        { path: 'edit/:id', component: EditworkflowComponent },
        { path: 'editworkflow/:id', component: UpdateWorkflowComponent },
      ]
    },

    { path:'entity-report' , component: Report2Component,
                  children : [
                    { path: ''        , redirectTo: 'all', pathMatch: 'full'},
                    { path: 'all'   , component: Allreport2Component  },
                    { path: 'add'   , component: Addreport2Component },
                    { path: 'edit/:id'   , component: Editreport2Component },
                    { path: 'science'   , component:  ScienceComponent},
//add_routingreport
                  ]
                },

                 // code extraction start
      {path: 'code-extraction',component:CodeExtractionComponent ,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component:CodeExtractionallComponent },
          { path: 'add', component:CodeExtractionaddComponent },
          { path: 'edit/:id'   , component: CodeExtractioneditComponent},
          { path: 'file-editor', component:FileEditor1Component },
          { path: 'workflow/:id', component:CodeworkflowComponent },
          {
            path: 'params',
            component: CodeExtractionParamComponent,
            children: [
              { path: '', redirectTo: 'all', pathMatch: 'full' },
              { path: 'all', component: CodeExtractionParamallComponent },
              { path: 'edit/:id', component: CodeExtractionParameditComponent },
              {path: 'file-editor-new/:id',component: FileEditorNewComponent,
              },

            ],
          },
          {
            path: 'builderFiles',
            component: CodeExtractionBuilderComponent,
            children: [
              { path: '', redirectTo: 'all', pathMatch: 'full' },
              { path: 'all', component: CodeExtractionBuilderAllComponent },
              // { path: 'edit/:id', component: CodeExtractionParameditComponent },
              {path: 'file-editor-builder/:id',component: FileEditorBuilderComponent,
              },

            ],
          },

        ],
      }, // code extraction end

       // Rule Library Start
       {
        path: 'rule-library',
        component: RuleLibraryComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: RuleLibraryallComponent },
          { path: 'add', component: RuleLibraryaddComponent },
          { path: 'edit/:id', component: RuleLibraryeditComponent},
        ],
      }, // Rule library END

       // Exception Rule Library Start
       {
        path: 'exception-rule-library',
        component: RuleLibraryExceptionComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: RuleLibraryExceptionallComponent },
          { path: 'add', component: RuleLibraryExceptionaddComponent },
          { path: 'edit/:id', component: RuleLibraryExceptioneditComponent },
        ],
      }, // Exception Rule library END
       // TECHNOLOGY STACK Start
       {
        path: 'tech-stack',
        component: TechnologyStackComponent,
        children: [
          { path: '', redirectTo: 'all', pathMatch: 'full' },
          { path: 'all', component: TechnologyStackallComponent },
          { path: 'add', component: TechnologyStackaddComponent },
          { path: 'edit/:id'   , component: TechnologyStackeditComponent},
          { path: 'techstackelement/:id'   , component: TechnologyelementComponent},
        ],
      }, // TECHNOLOGY STACK END
    //report builder
 { path:'report-builder' , component: ReportBuilderComponent,
 children : [
   { path: ''        , redirectTo: 'all', pathMatch: 'full'},
   { path: 'all'   , component:  AllComponent},
   { path: 'add'   , component: AddComponent },
   { path: 'edit/:id'   , component: EditComponent },
   { path: 'table-setup'   , component: RbTableSetupComponent},
   { path: 'column-setup'   , component: RbColumnSetupComponent},
   { path: 'where-param'   , component: RbWhereColumnSetupComponent},
   { path: 'date-param'   , component: RbDateParamSetupComponent},
   { path: 'adhoc-param'   , component: RbAdhocParamSetupComponent},
   { path: 'std-param'   , component: RbStdParamComponent},
   { path: 'query-param'   , component: RbQueryBuildComponent},
   { path: 'query-runner'   , component: QueryRunnerComponent},
   { path: 'query-runner1'   , component: QueryRunner1Component},
   { path: 'science'   , component:  ScienceComponent},
//add_routingreport
 ]
},

{
  path:'report-build', component:WebBuilderComponent,
  children : [
    { path:'',redirectTo:'all',pathMatch:'full'},
    { path:'all',component: AllwebpageComponent},
    { path:'addpage',component:AddwebpageComponent},
    { path:'editpage/:id', component:EditwebpageComponent},
    { path:'editdata/:id',component:EditFormComponent}
  ]
},
{path: 'reportbuild',component:ReportBuildComponent},

//newdashboard
{
  path:'dashboard-gird',component:DashboardnewComponent,
  children:[

    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: AllnewdashComponent},
    { path: 'adddata', component :AddnewdashComponent },
    { path: 'editdashn/:id', component: EditnewdashComponent },
  ]
},
//bi-build
{
  path:'bi-widgets' , component: BiWidgetsComponent,
  children : [{ path: ''        , redirectTo: 'all', pathMatch: 'full'},
  { path: 'all'   , component:  AllWidgetComponent},
  { path: 'add-widget'   , component: AddWidgetComponent },
  { path: 'edit-widget/:id'   , component: EditWidgetsComponent }
  ]

},

{
  path:'bi-dashboard' , component: BiDashboardComponent,
  children : [{ path: ''        , redirectTo: 'all-dash', pathMatch: 'full'},
  { path: 'all-dash'   , component:  AllDashComponent},
  { path: 'add-dash'   , component: AddDashComponent },
//   { path: 'widget-dash/:id'   , component: WidgetDashboardComponent },
//   { path: 'ganesh'   , component:  ganesh},

 { path: 'test_19'   , component:  Test19Component},

// { path: 'dash_21'   , component:  dash_21},
//add_routing

  { path: 'edit-dash/:id'   , component: EditDashComponent,
  children:[
  { path: ''        , redirectTo: 'add-defination', pathMatch: 'full'},
  { path: 'add-defination'   , component: AddDefinationComponent}]},
  { path: 'add-def/:id'   , component: AddDefinationComponent},
  { path: 'update-modal/:id/:name',component:UpdateWidgetModalComponent}

 ]
},

//action
{
  path: 'action-builder',
  component: ActionBuilderComponent,
  children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: AllActionComponent },
    { path: 'adda', component: AddActionComponent },
    { path: 'edita/:id', component: EditActionComponent },
    {
      path: 'lines',
      component: ActionBuilderLineComponent,
      children: [
        { path: '', redirectTo: 'all', pathMatch: 'full' },
        { path: 'all', component: AllActionBuilderLineComponent },
        { path: 'add', component: AddActionBuilderLineComponent },
        { path: 'edit/:id', component: EditActionBuilderLineComponent },

      ],
    },
  ],
},
{path: 'list-builder', component: ListbuilderComponent,

children: [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: ListbuilderallComponent },
  { path: 'addl', component: ListbuilderaddComponent },
  { path: 'editl/:id', component: ListbuildereditComponent },
  {
    path: 'lines',
    component: ListbuilderLineComponent,}
]

},
    {
      path: 'menu-group', component: MenuGroupComponent,
      children: [
        { path: '', redirectTo: 'all-menu' ,pathMatch: 'full' },
        { path: 'all-menu', component: AllMenuGroupComponent },
        { path: 'edit-menu', component: EditMenuGroupComponent },
        { path: 'read-only', component: ReadOnlyMenuGroupComponent }
      ],
    },

    {
      path: 'menu-r', component: MenuRegisterComponent,
      children: [
        { path: '', redirectTo: 'all-r', pathMatch: 'full' },
        { path: 'all-r', component: AllMenurComponent },
        { path: 'add-r', component: AddMenurComponent },
        { path: 'edit-r', component: EditMenurComponent },
        { path: 'readonly-r', component: ReadonlyMenurComponent }
      ],
    },

      { path: 'project', component: ProjectsetupComponent,
      children:[
        { path: '', redirectTo: 'all', pathMatch: 'full' },
         { path: 'all',component: AllprojectsetupComponent},
         { path: 'add', component: AddprojectsetupComponent },
         { path: 'edit/:id', component: EditprojectsetupComponent },

         {
          path: 'modules', component: ModuleSetupComponent,
          children: [
            { path: '', redirectTo: 'all', pathMatch: 'full' },
            { path: 'all', component: AllmoduleSetupComponent },
            { path: 'add', component: AddmoduleSetupComponent },
            { path: 'edit/:id', component: EditmoduleSetupComponent },
             {path: 'projectview', component: ProjectviewComponent},
            { path: 'actions', component: ActionsComponent },



 // wireframe start
 {
  path: 'wireframe', component: WireframeComponent,
  children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all', component: AllwireframeComponent },
    { path: 'add', component :AddwireframeComponent },
    { path: 'types', component: WireframetypeComponent },

    { path: 'edit/:id', component: EditwireframeComponent },
    { path: 'edit2/:hid', component: Edit2wireframeComponent },
    { path: 'update/:id', component: UpdateWireframeComponent },
    { path: 'edit/:id/properties', component: PropertiesComponent },
    { path: 'edit/:id/property', component: PropertyComponent },



    { path: 'edit/:id/uinameedit'   , component: UinameeditComponent }

  ]
},




          ]}
              ]
            },


            { path: '**', component: PageNotFoundComponent },
      ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
