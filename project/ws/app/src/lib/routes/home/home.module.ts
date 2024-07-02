import { CommsComponent } from './routes/comms/comms.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PipeFilterModule, PipeHtmlTagRemovalModule, PipeOrderByModule, PipeRelativeTimeModule } from '@sunbird-cb/utils'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatDividerModule } from '@angular/material/divider'
import { WidgetResolverModule } from '@sunbird-cb/resolver'
import {
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatTableModule,
  MatSortModule,
  MatMenuModule,
  MatPaginatorModule,
  MAT_DIALOG_DATA,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatTooltipModule,
  MatToolbarModule,
} from '@angular/material'
import { MatCardModule } from '@angular/material/card'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { InitResolver } from './resolvers/init-resolve.service'
import { RouterModule } from '@angular/router'
import { HomeRoutingModule } from './home.rounting.module'
import { HomeComponent } from './routes/home/home.component'
import { UsersViewComponent } from './routes/users-view/users-view.component'
import {
  AvatarPhotoModule,
  BtnPageBackModuleAdmin,
  UserAutocompleteModule,
  BreadcrumbsOrgModule,
  UIORGTableModule,
  ScrollspyLeftMenuModule,
} from '@sunbird-cb/collection'
// TO-DO need to enable for image crop
// import { ImageCropModule } from './routes/image-crop/image-crop.module'
import { AboutComponent } from './routes/about/about.component'
import { RolesAccessComponent } from './routes/roles-access/roles-access.component'
import { DirectoryViewComponent } from './routes/directory/directroy.component'
import { CreateMdoComponent } from './routes/create-mdo/create-mdo.component'
import { UserPopupComponent } from './routes/user-popup/user-popup'
import { UsersComponent } from './routes/users/users.component'
import { OpenRolesDialogComponent } from './routes/users/components/open-roles-dialog/open-roles-dialog.component'
import { EditDepartmentDialogComponent } from './routes/users/components/edit-department-dialog/edit-department-dialog.component'
import { CreateUserComponent } from './routes/create-user/create-user.component'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { UIAdminTableModule } from '../../head/ui-admin-table/ui-admin-table.module'
import { ModerationViewComponent } from './routes/moderation/moderation.component'
import { RolesUsersComponent } from './routes/roles-users/roles-users.component'
import { ReportsComponent } from './routes/reports/reports.component'
import { PositionsModule } from './routes/positions/positions.module'
import { OnboardingRequestsComponent } from './routes/onboarding-requests/onboarding-requests.component'
import { RequestsApprovalComponent } from './routes/requests-approval/requests-approval.component'
import { AcsendingOrderPipe } from './pipes/acsending-order.pipe'
import { RejectReasonDialogComponent } from './routes/reject-reason-dialog/reject-reason-dialog.component'
import { EmailDomainsComponent } from './routes/email-domains/email-domains.component'
import { EventsListComponent } from './routes/events/events-list/events-list.component'
import { EventListViewComponent } from './routes/events/event-list-view/event-list-view.component'
import { EventThumbnailComponent } from './routes/events/event-thumbnail/event-thumbnail.component'
import { CreateEventComponent } from './routes/events/create-event/create-event.component'
import { ParticipantsComponent } from './routes/events/participants/participants.component'
import { SuccessComponent } from './routes/events/success/success.component'
import { PipeEmailPipe } from './pipes/pipe-email.pipe'
import { EditEventComponent } from './routes/events/edit-event/edit-event.component'
import { PipePublicURLModule } from './pipes/pipe-public-URL/pipe-public-URL.module'
import { AcbpReportsComponent } from './routes/acbp-reports/acbp-reports.component'
import { GeneralReportsComponent } from './routes/general-reports/general-reports.component'
import { SectorsComponent } from './routes/sectors/sectors.component'
import { SectorListViewComponent } from './routes/sectors/sector-list-view/sector-list-view.component'
import { AddSectorComponent } from './routes/sectors/add-sector/add-sector.component'
import { EditSectorComponent } from './routes/sectors/edit-sector/edit-sector.component'
import { AddThumbnailComponent } from './routes/add-thumbnail/add-thumbnail.component'
import { AllRequestComponent } from './routes/request/all-request/all-request.component'
import { RequestCopyDetailsComponent } from './routes/request/request-copy-details/request-copy-details.component'
import { CompetencyViewComponent } from './routes/request/competency-view/competency-view.component'
import { ConfirmationPopupComponent } from './routes/request/confirmation-popup/confirmation-popup.component'
import { AssignListPopupComponent } from './routes/request/assign-list-popup/assign-list-popup.component'
import { SingleAssignPopupComponent } from './routes/request/single-assign-popup/single-assign-popup.component'
@NgModule({
  declarations: [
    HomeComponent,
    UsersViewComponent,
    AboutComponent,
    RolesAccessComponent,
    DirectoryViewComponent,
    OnboardingRequestsComponent,
    EmailDomainsComponent,
    RequestsApprovalComponent,
    CreateMdoComponent,
    UserPopupComponent,
    UsersComponent,
    OpenRolesDialogComponent,
    EditDepartmentDialogComponent,
    CreateUserComponent,
    ModerationViewComponent,
    RolesUsersComponent,
    ReportsComponent,
    CommsComponent,
    AcbpReportsComponent,
    GeneralReportsComponent,
    SectorsComponent,
    AddSectorComponent,
    EditSectorComponent,
    AddThumbnailComponent,
    EventsListComponent,
    EventListViewComponent,
    EventThumbnailComponent,
    CreateEventComponent,
    SectorListViewComponent,
    EditEventComponent,
    ParticipantsComponent,
    SuccessComponent,
    AcsendingOrderPipe,
    PipeEmailPipe,
    RejectReasonDialogComponent,
    AllRequestComponent,
    RequestCopyDetailsComponent,
    CompetencyViewComponent,
    ConfirmationPopupComponent,
    AssignListPopupComponent,
    SingleAssignPopupComponent,
  ],
  imports: [
    CommonModule,
    WidgetResolverModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    PositionsModule,
    FormsModule,
    RouterModule,
    MatGridListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    PipeFilterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PipeHtmlTagRemovalModule,
    PipeRelativeTimeModule,
    AvatarPhotoModule,
    BreadcrumbsOrgModule,
    PipeOrderByModule,
    BtnPageBackModuleAdmin,
    WidgetResolverModule,
    UserAutocompleteModule,
    MatTooltipModule,
    // TO-DO need to enable for image crop
    // ImageCropModule,
    UIAdminTableModule,
    UIORGTableModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    MatPaginatorModule,
    PipePublicURLModule,
    ScrollspyLeftMenuModule,
    MatRadioModule,
    MatTooltipModule,
    MatToolbarModule,
    // TO-DO need to enable for image crop
    // ImageCropModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  entryComponents: [
    UserPopupComponent,
    OpenRolesDialogComponent,
    EditDepartmentDialogComponent,
    RejectReasonDialogComponent,
    EventThumbnailComponent,
    ParticipantsComponent,
    AddThumbnailComponent,
    CompetencyViewComponent,
    ConfirmationPopupComponent,
    SuccessComponent,
    AssignListPopupComponent,
    SingleAssignPopupComponent],
  providers: [
    // CKEditorService,
    // LoaderService,
    InitResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    MatDatepickerModule, MatNativeDateModule,
    ConfirmationPopupComponent,
  ],
  exports: [AddThumbnailComponent],
})
export class HomeModule {

}
