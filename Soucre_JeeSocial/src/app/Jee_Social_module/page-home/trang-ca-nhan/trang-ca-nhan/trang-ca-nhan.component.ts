import { AuthService } from './../../../../modules/auth/_services/auth.service';
import { LayoutUtilsService } from './../../../../_metronic/core/utils/layout-utils.service';
import { PageHomeService } from './../../_services/page-home.service';
import { EditTieusuComponent } from './../edit-tieusu/edit-tieusu.component';






// import { CommentEditDialogComponent } from './../comment/comment-edit-dialog/comment-edit-dialog.component';
import { Component, OnInit, ChangeDetectorRef, Input, ViewChild, ElementRef, HostListener } from '@angular/core';



import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
import { PopoverContentComponent } from 'ngx-smart-popover';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { concatMap, delay, first } from 'rxjs/operators';


import { TrangCaNhanService } from '../../_services/trang-ca-nhan.service';
import { UpdateAvtarComponent } from '../update-avtar/update-avtar.component';
import { CommentService } from '../../_services/comment.service';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ImageModel } from '../../_model/Img.model';

@Component({
  selector: 'kt-trang-ca-nhan',
  templateUrl: './trang-ca-nhan.component.html',
  styleUrls: ['./trang-ca-nhan.component.scss']
})
export class TrangCaNhanComponent implements OnInit {
  item_11:any[]=[];
  data: any[] = [];
  base64Image: string;
  nameimg:any;
  image: any;
	id_canhan:number;
//  data: any[] = [];
  filter: any = {};
  cmt:any[]=[];
  // dataSource: BaiDangDataSource;
  @ViewChild("keyword", { static: true }) keyword: ElementRef;
  
	// listResult = new Subject();
	example: string = `<div>this is another div <br/> Đây là inser</div>`
	// Public properties
	ItemData: any = {};

	FormControls: FormGroup;
	hasFormErrors: boolean = false;
	disBtnSubmit: boolean = false;
	loadingSubject = new BehaviorSubject<boolean>(true);
	loading$: Observable<boolean>;
	viewLoading: boolean = false;
	isChange: boolean = false;
	isZoomSize: boolean = false;
	LstDanhMucKhac: any[] = [];
	public datatreeDonVi: BehaviorSubject<any[]> = new BehaviorSubject([]);
	private componentSubscriptions: Subscription;

	ListDonViCon: any[] = [];
	ListVanBan: any[] = [];
	datasource: any;

	ListAttachFile: any[] = [];
	ListYKien: any[] = [];
	AcceptInterval: boolean = true;
	NguoiNhan: string = '';
	//NguoiNhans:any[]=[{FullName:'người 1'},{FullName:'người 2'}];

	Comment: string = '';
	AttachFileComment: any[] = [];
	fileControl: FormControl;
	setting: any = {
		ACCEPT_DINHKEM: '',
		MAX_SIZE: 0
  };
  listTrangCaNhan:any[]=[];
	files: any = {};
	//reload: boolean = true;
	UserData: any = {};
	emotions: any = {};
	accounts: any = {};
	icons: any[] = [];
	id_user:number;
	list_icon: any[] = [];
	list_randomanh:any[]=[];
	public anchors;
	//tag username
	@ViewChild('myPopoverC', { static: true }) myPopover: PopoverContentComponent;
	selected: any[] = [];
	listUser: any[] = [];
	options: any = {};
	@ViewChild('matInput', { static: true }) matInput: ElementRef;
	@ViewChild('hiddenText', { static: true }) textEl: ElementRef;
	CommentTemp: string = '';
	indexxxxx: number = -1;
	isPopoverOpen = false;
	@ViewChild('myPopoverB', { static: true }) myPopoverU: PopoverContentComponent;
  it: any = {};
  tt:boolean=true;
  isShow=true;
  isShowForm=false;
  id_baidang_cmt:number;
  filesAmount: File = null;
  id_bd_cmt:number;
	item:any;
  dulieu_cmt = new FormControl('');
  edit_dulieu_cmt=new FormControl('');

  list_userchat:any[]=[];


	ListMedia:any[]=[];
  dulieu_cmt_child:string=''
  @Input() ID_QuyTrinh: any;
  listKhenThuong:any[] = [];

  listTT_user:any[] = [];
  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    
    public _services_canhan: TrangCaNhanService,
     public _services: PageHomeService,
    private _service_cmt:CommentService,
    private sanitized: DomSanitizer,
	public dialog: MatDialog,
	// private tokenStore:TokenStorage,
	private layoutUtilsService: LayoutUtilsService,
	private translate: TranslateService,
	private auth:AuthService,

	private http: HttpClient
  ) { }


	filterConfiguration(): any {
		return this.filter;
  }

 
          
        //	Popup thêm mới, chỉnh sửa
     

	InsertMedia()
	{

	}

    LoadData() {
      // debugger
      this._services.getUserData().subscribe(res =>{
        this.item_11= res;
      });
    }
//   Thêm comment trong bài đăng


  layIDBaiDang(id_baidang_cmt:number){
	 
		this.id_bd_cmt=id_baidang_cmt;
	console.log('id_baidangcmt',id_baidang_cmt);

  }

GetCurrentUser() {
	// debugger
	this._services.getUserData().subscribe(res =>{
	//   this.item= res;
	  this.id_user=res.Id;
	});
   
  }



  loadTTuser()
  {
	  this.auth.getProFileUsers_change().subscribe(res =>{	

		  this.listTT_user=res.data;
		  this.changeDetectorRefs.detectChanges();
		 
	  })
  }

  LoadTrangCaNhan()
  {
      this._services_canhan.gettrangCaNhan(this._services_canhan.rt_API_TrangCaNhan).subscribe(res=>{
		this.listTrangCaNhan=res.data;
		this.id_canhan=this.listTrangCaNhan[0].id_canhan;
        this.changeDetectorRefs.detectChanges();
      })
  }
 
 
  ngOnInit() {
	this.GetCurrentUser();
    this.LoadData();
    this.LoadTrangCaNhan();
 

 
   this.loadTTuser();


  
  }


	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}

		// if (this.interval) {
		// 	clearInterval(this.interval);
		// }

		this.AcceptInterval = false;
	}



	/**
	 * Create form
	 */
	createForm() {
	

		for (var i = 0; i < this.ListYKien.length; i++) {
			this.ListAttachFile.push([])
		
		}
	}

	GetListAttach(ind: number): any {
		return this.ListAttachFile[ind];
	}

	/**
	 * Check control is invalid
	 * @param controlName: string
	 */
	isControlInvalid(controlName: string): boolean {
		const control = this.FormControls.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
	onSubmit(type: boolean) {
		let ArrDVC: any[] = [];
		for (var i = 0; i < this.ListDonViCon.length; i++) {
			if (this.ListDonViCon[i].check) {
				ArrDVC.push(this.ListDonViCon[i]);
			}
		}
		if (type) {
			//this.dialogRef.close(ArrDVC);
		}
		else {
			//this.dialogRef.close();
		}
	}

	ShowOrHideComment() {
		var x = document.getElementById("ykchild");
		//var a = document.getElementById("btnHideyk" + ind);
		//var b = document.getElementById("btnShowyk" + ind);
		if (!x.style.display || x.style.display === "none") {
			x.style.display = "block";
			//a.style.display = "block";
			//b.style.display = "none";
		} else {
			x.style.display = "none";
			//a.style.display = "none";
			//b.style.display = "block";
		}
	
		return x.style.display;
	}
	toggleWithGreeting(popover) {
		if (popover.isOpen()) {
		  popover.close();
		} else {
		//   popover.open({greeting, language});
		}
	  }




	onSelectFile_PDF(event) {

		setTimeout(() => {
			
			if (event.target.files && event.target.files[0]) {
	   
				var filesAmount = event.target.files[0];
				var Strfilename = filesAmount.name.split('.');
			  
			  
			
			  
				var reader = new FileReader();
			
				//this.FileAttachName = filesAmount.name;
				let base64Str: any;
				reader.onload = (event) => {
			
				  this.image=reader.result;
				this.base64Image = ''+event.target["result"];
				this.nameimg=filesAmount.name;
				this.base64Image = this.base64Image.split(',')[1];
				console.log(this.image);
					this.changeDetectorRefs.detectChanges();
			  
				  }
				}
			
			  reader.readAsDataURL(filesAmount);
			}, 100);
			
		
			 } 
	
	
	
			 CloseIMG()
			 {
			   this.image=null;
			   this.nameimg=null;
			 
			 }

			
		  
		
		  
// pareseHtml_img(str)
// {	
// 	const result = `<img src="${str}" width="200" height="100">`;
// 	return result;
// }
	parseHtml(str) {
		var html = str;
		var reg = /@\w*(\.[A-Za-z]\w*)|\@[A-Za-z]\w*/gm
		var reg1 = /\:[A-Za-z]\w*\:/gm
		var match = html.match(reg);
		if (match != null) {
			for (var i = 0; i < match.length; i++) {
				var key = match[i] + '';
				var username = key.slice(1);
				if (this.accounts[key]) {
					// var re = `<span class="url inline-tag" data-username="${username}">${this.accounts[key]}</span>`;
					// html = html.replace(key, re);
				}
			}
		}
		match = html.match(reg1);
		if (match != null) {
			for (var i = 0; i < match.length; i++) {
				var key = match[i] + '';
				if (this.emotions[key]) {
					// var re = `<img src="${this.emotions[key]}" />`;
					// html = html.replace(key, re);
				}
			}
		}
			// setTimeout(() => {
			// 	this.ngAfterViewInit();
			// }, 10)
		//return html;
		return this.sanitized.bypassSecurityTrustHtml(html)
	}
	
	remove(item, index, indexc = -1) {
		
	}

	
	//#region tag username
	getOptions() {
		var options: any = {
			showSearch: false,
			keyword: this.getKeyword(),
			data: this.listUser.filter(x => this.selected.findIndex(y => x.id_nv == y.id_nv) < 0),
		};
		return options;
	}
	getKeyword() {
		let i = this.CommentTemp.lastIndexOf('@');
		if (i >= 0) {
			let temp = this.CommentTemp.slice(i);
			if (temp.includes(' '))
				return '';
			return this.CommentTemp.slice(i);
		}
		return '';
	}
	list_rep:any[]=[];

	reply(id_u:number,index, indexc = -1)
	{ 
		
		// this._service_cmt.TagName(id_u).subscribe(res=>{
		// 		this.list_rep=res.data;	
		// 		this.dulieu_cmt_child="@"+this.list_rep[0].Username;
		// 		this.changeDetectorRefs.detectChanges();

		// })

	
	
	}
	Show()

	{
		this.myPopover.show();
	}

	onSelectFile_PDF_AnhBia(event) {
 
		if (event.target.files && event.target.files[0]) {
	   
		  var filesAmount = event.target.files[0];
		  var Strfilename = filesAmount.name.split('.');
		
		
	  
		
		  var reader = new FileReader();
		  //this.FileAttachName = filesAmount.name;
		  let base64Str: any;
		  reader.onload = (event) => {
			this.image=reader.result;
		  this.base64Image = ''+event.target["result"];
		  this.nameimg=filesAmount.name;
		  this.base64Image = this.base64Image.split(',')[1];
		
			  this.changeDetectorRefs.detectChanges();
		
			}
		  }
	  
		reader.readAsDataURL(filesAmount);
	  
	
	
	  
	
	  } 
	   Item_hinh_AnhBia():ImageModel {
		 
		const item = new ImageModel();
	  
	
			 item.image=this.base64Image;
			 if(this.nameimg==="")
			 {
			  item.name=null;
			 }
			 else
	
			 {
			  item.name=this.nameimg;
			 }
			
		
		this.changeDetectorRefs.detectChanges();
		return item;
	  }
	  
	  
		
	
		insert_file_AnhBia()
		{
		
		  let hinh=this.Item_hinh_AnhBia();
	   
		
		   this._services_canhan.ChangeAnhBia(this.id_canhan,hinh,this._services_canhan.rt_API_TrangCaNhan).subscribe((res) => {
			this.LoadTrangCaNhan();
		  });
		 
		
		}
	
	updateAnhBia()

	{
			this.insert_file_AnhBia();
		
			this.image=null;
	}
	UpdateTieuSu(item,index,indexc=-1) {
		//debugger
		var data = Object.assign({}, item);
		// var data = Object.assign({}, item);
		const dialogRef = this.dialog.open(EditTieusuComponent, { data:data,
			
			width: '500px' });
		dialogRef.afterClosed().subscribe(res => {
			if (res) {
				item.tieusu = res.tieusu
				this.LoadTrangCaNhan();
				this.changeDetectorRefs.detectChanges();
			}
			else
			{
				this.LoadTrangCaNhan();
				this.changeDetectorRefs.detectChanges();
			}
		});
	}


	UpdateAvtar() {
			 
	
		const dialogRef = this.dialog.open(UpdateAvtarComponent, {
			width: '700px',
			 height:'200px',
			data: {} })
		
		dialogRef.afterClosed().subscribe(res => {

			if (res) {
					this.LoadTrangCaNhan();
				// this.layoutUtilsService.showActionNotification(_saveMessage, 4000, );
				this.changeDetectorRefs.detectChanges();
			}
			else
			{
				this.LoadTrangCaNhan();
			}
		});
	}

}
