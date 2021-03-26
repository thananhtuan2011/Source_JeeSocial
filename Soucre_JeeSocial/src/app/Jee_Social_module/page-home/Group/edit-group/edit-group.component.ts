import { LayoutUtilsService } from './../../../../_metronic/core/utils/layout-utils.service';
import { AuthService } from './../../../../modules/auth/_services/auth.service';




import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PopoverContentComponent } from 'ngx-smart-popover';
import { GroupService } from '../../_services/group.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'kt-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {

  id_user:number;
  group: any = {};
  id_gr:number;
  listTT_user:any[]=[];

	@Output() ItemSelected = new EventEmitter<any>();
	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		// private tokenStore:TokenStorage,
		// private authNoticeService: AuthNoticeService,
		private router:Router,
		private changeDetectorRefs: ChangeDetectorRef,
		private auth:AuthService,
    private _services:GroupService,
    public dialogRef: MatDialogRef<EditGroupComponent>,
		private layoutUtilsService: LayoutUtilsService,
		
    @Inject(MAT_DIALOG_DATA) public data: any
	) {
		
	}

	user:any[]=[];

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	GetCurrentUser() {
		// debugger
		this._services.getUserData().subscribe(res =>{
		  
		  this.user=res;
		  this.id_user=res.Id;
		  
		});

	}


			
  closeDia(data = undefined)
{
	this.dialogRef.close(data);
	// window.location.reload();
}

onSubmit() {
  this._services.UpdateGroup(this.group,this._services.rt_UpdateGroup).subscribe(res => {
    if (res && res.status == 1) {
      this.closeDia(res.data);
    }
  });

//   setTimeout(() => {

//   }, 200);



  
}

reload()
{

//   this._services.sendClickEvent();
//     this.changeDetectorRefs.detectChanges();
}


loadTTuser()
{
	this.auth.getProFileUsers_change().subscribe(res =>{	

		this.listTT_user=res.data;
		this.changeDetectorRefs.detectChanges();
		
	})
}

	ngOnInit() {
    this.GetCurrentUser();
    
    this.group = this.data;
	this.id_gr= this.group.ID_group;
	this.loadTTuser();
    this.changeDetectorRefs.detectChanges();
	}
	
	



	/*
    * On destroy


	/**
	 * Form initalization
	 * Default params, validators
	 */

// đẩy dữ liệu ra 
	

	/**
	 * Form Submit
	 */


	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */

	
}
