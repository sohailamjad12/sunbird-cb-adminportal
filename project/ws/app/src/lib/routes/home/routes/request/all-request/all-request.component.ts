import { Component, OnInit } from '@angular/core'
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { RequestServiceService } from '../request-service.service'
import { AssignListPopupComponent } from '../assign-list-popup/assign-list-popup.component'
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component'
import { SingleAssignPopupComponent } from '../single-assign-popup/single-assign-popup.component'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
export enum statusValue {
  Assigned= 'Assigned',
  Unassigned = 'Unassigned',
  Inprogress = 'InProgress',
  invalid = 'Invalid',
  fullfill= 'Fulfill',
}
@Component({
  selector: 'ws-app-all-request',
  templateUrl: './all-request.component.html',
  styleUrls: ['./all-request.component.scss'],
})
export class AllRequestComponent implements OnInit {

  btnList!: any
  tableData!: any
  reportSectionData: any
  public sideNavBarOpenedMain = true
  public screenSizeIsLtMedium = false
  lastUpdatedOn!: any
  pageNo = 0
  pageSize = 10
  requestListData: any[] = []
  requestCount: any
  isUnassigned = false
  isAssigned = false
  inProgress = false
  invalid = false
  dataSource: any
  displayedColumns: string[] = ['RequestId', 'title', 'requestedBy',
  'requestType', 'requestStatus', 'assignee', 'requestedOn', 'interests', 'action']
  dialogRef: any
  queryParams: any
  statusCards: any[] = [];
  filterList:any[]=[]
  statusKey = statusValue
  invalidRes: any;
  selectedList:any[]=[]
  isShowBtn:boolean = false;
  filterForm!:FormGroup;
  isFilterOpen:boolean = false

  dropdownOpened:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private requestService: RequestServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {
      this.filterForm  = this.formBuilder.group({
        statusData: new FormControl(false),
      })
    }
  ngOnInit() {
    this.getRequestList()
     this.getStatusCount()     
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  onApplyfilter(){
   this.pageNo =0;
   this.pageSize = 10;
   this.getRequestList()
  }

  onCheckboxChange(event:any, value: string){
  if(event.checked){
  this.selectedList.push(value)
  this.isShowBtn = true
  }
  else {
    const index = this.selectedList.indexOf(value);
    if (index > -1) {
      this.selectedList.splice(index, 1);
    }
    if(this.selectedList.length === 0){
      this.getRequestList()
      this.isShowBtn = false
    }
  }
  }

  clearSelection(){
    if(this.filterForm.value.statusData){
      this.filterForm.reset()
      this.selectedList =[]
  
      this.getRequestList()
    }
   
  }

  searchValuetext(searchText:string){
  if(searchText.length > 2){
   this.getRequestList(searchText)
  }
  else if(searchText.length === 0) {
    this.getRequestList()
  }
  
  }

  getStatusCount() {
    const request = {
      // filterCriteriaMap: {},
      requestedFields: ['status'],
      orderBy: 'createdOn',
      orderDirection: 'ASC',
      facets: ['status'],
      
    }
    this.requestService.getRequestList(request).subscribe((res: any) => {
      if (res.facets && res.facets.status) {
        this.statusCards = res.facets.status
        this.filterList = res.facets.status
        const toolTipText: any = {
          Assigned: 'Total number of requests assigned',
          Invalid: 'Total number of Invalid requests',
          Unassigned: 'Total number of unassigned requests',
          InProgress: 'Total number of In-progress requests',
          Fulfill: 'Total number of requests fulfilled',
        }
        this.statusCards = this.statusCards.map(status => ({
          ...status,
          message: toolTipText[status.value] || '',
        }))
        const allStatusValues = ['Assigned', 'Invalid', 'Unassigned', 'InProgress', 'Fulfill']
        const existingValues = new Set(this.statusCards.map(status => status.value))
        // Add missing status values with a count of 0
        allStatusValues.forEach(status => {
          if (!existingValues.has(status)) {
            this.statusCards.push({ value: status, count: 0 })
          }
        })

          }
    })

  }

  getRequestList(searchKey?:string) {
    const request = {
      requestedFields: [],
      filterCriteriaMap:{},
      facets: [],
      pageNumber: this.pageNo,
      pageSize: this.pageSize,
      orderBy: 'createdOn',
      orderDirection: 'ASC',
      searchString:searchKey
    }
    if( this.selectedList && this.selectedList.length){
      request.filterCriteriaMap = {status:this.selectedList}
    }
    else {
      request.filterCriteriaMap={}
    }
    this.requestService.getRequestList(request).subscribe((res: any) => {
      if (res.data) {
      this.requestListData = res.data
      if (this.requestListData) {
        this.requestCount = res.totalCount

        this.requestListData.map((data: any) => {
          // if (data.createdOn) {
          //   data.createdOn = this.datePipe.transform(data.createdOn, 'MMM d, y')
          // }
          if (data.assignedProvider) {
            data.assignedProvider = data.assignedProvider.providerName
          }
          if (data.status === 'Unassigned') {
            this.isUnassigned = true
          } else if (data.status === 'Assigned') {
            this.isAssigned = true
          } else if (data.status === 'Inprogress') {
            this.inProgress = true
          } else if (data.status === 'invalid') {
            this.invalid = true
          }
        })
        this.dataSource = new MatTableDataSource<any>(this.requestListData)
      }
    }
    })

  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Unassigned':
        return 'status-unassigned'
      case 'Assigned':
        return 'status-assigned'
      case 'Invalid':
        return 'status-invalid'
      case 'Fulfill':
        return 'status-fullfill'
      case 'InProgress':
        return 'status-inprogress'
      default:
        return ''
    }
  }

  handleClick(element: any): void {
    if (element.status && element.status.length > 0) {
      if (element.status !== this.statusKey.Inprogress &&
        element.status !== this.statusKey.invalid &&
        element.status !== this.statusKey.fullfill) {
        this.onClickMenu(element, 'assignContent')
    }
    }

}

  onClickMenu(item: any, action: string) {
  switch (action) {
    case 'viewContent':

      this.queryParams = {
      id: item.demand_id,
      name: 'view',
    }
      this.router.navigate(['/app/home/request-details'], { queryParams: this.queryParams })
      break
    case 'invalidContent':
       this.showConformationPopUp(item, action)
      break
    case 'assignContent':
       this.openAssignlistPopup(item)
      break
    case 'reAssignContent':
      // this.showConformationModal(_event.row, _event.action)
      // this.openAssignlistPopup(item)
      if (item.requestType === 'Broadcast') {
        this.openAssignlistPopup(item)
      } else {
        this.openSingleReassignPopup(item)
        // this.queryParams = {
        //   id: item.demand_id,
        //   name: 'reassign',
        // }
        //   this.router.navigate(['/app/home/request-details'], { queryParams: this.queryParams })
      }
      break
    case 'copyContent':
        this.queryParams = {
          id: item.demand_id,
          name: 'copy',
        }
          this.router.navigate(['/app/home/request-details'], { queryParams: this.queryParams })
      break
  }

  }

  openSingleReassignPopup(item: any) {
    this.dialogRef = this.dialog.open(SingleAssignPopupComponent, {
      disableClose: false,
      width: '90%',
      height: '70vh',
      data: item,
      autoFocus: false,
    })

    this.dialogRef.afterClosed().subscribe((_res: any) => {
      if (_res && _res.data === 'confirmed') {
        setTimeout(() => {
          this.getRequestList()
        },         1000)

         this.snackBar.open('Re-assign submitted Successfully')
      } else {
        // this.snackBar.open('error')
      }
    })
  }

  navigateToDetails(id: any) {
    this.queryParams = {
      id,
      name: 'view',
    }
    this.router.navigate(['/author/cbp/demand-details-form'], { queryParams: this.queryParams })
  }

  onChangePage(event: any) {
    this.pageNo = event.pageIndex
    this.pageSize = event.pageSize
    this.getRequestList()
    }

    showConformationPopUp(_selectedRow: any, _type: any) {
      this.dialogRef = this.dialog.open(ConfirmationPopupComponent, {
        disableClose: true,
        data: {
          type: 'conformation',
          icon: 'radio_on',
          title: (_type === 'invalidContent') ? 'Are you sure you want to mark this as invalid.' :
            (_type === 'publishContent') ? 'Are you sure you want to publish the plan?' : '',
          subTitle: '',
          primaryAction: 'Yes',
          secondaryAction: 'No',
        },
        autoFocus: false,
      })

      this.dialogRef.afterClosed().subscribe((_res: any) => {
        if (_res === 'confirmed') {
          if (_type === 'invalidContent') {
            this.invalidContent(_selectedRow)
          }
          //  else if (_type === 'publishContent') {
          //   this.publishContentData(_selectedRow)
          // }
        }
      })
  }

  invalidContent(row: any) {
    const request = {
     demand_id: row.demand_id,
     newStatus: 'Invalid',
    }
    this.requestService.markAsInvalid(request).subscribe(res => {
      if (res) {
        this.invalidRes = res
        setTimeout(() => {
          this.getRequestList()
        },         1000)
        this.snackBar.open('Marked as Invalid')
      }

     }
   )

   }

    openAssignlistPopup(item: any) {
      this.dialogRef = this.dialog.open(AssignListPopupComponent, {
        disableClose: true,
        width: '90%',
        height: '70vh',
        data: item,
        autoFocus: false,
      })

      this.dialogRef.afterClosed().subscribe((_res: any) => {
        if (_res && _res.data === 'confirmed') {
          setTimeout(() => {
            this.getRequestList()
          },         1000)
           this.snackBar.open('Assigned submitted Successfully')
        } else {
          // this.snackBar.open('error')
        }
      })
    }

}
