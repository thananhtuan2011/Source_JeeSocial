import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentService } from '../../../_services/comment.service';


@Component({
  selector: 'kt-comment-edit-dialog',
  templateUrl: './comment-edit-dialog.component.html',
  styleUrls: ['./comment-edit-dialog.component.scss']
})
export class CommentEditDialogComponent implements OnInit {
  comment: any = {};
  Backdata: any = {};
	viewLoading:boolean=false;
  constructor(
    public dialogRef: MatDialogRef<CommentEditDialogComponent>,
    private changeDetectorRefs: ChangeDetectorRef,
    private _service_cmt:CommentService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  closeDia(data=undefined)
{
    this.dialogRef.close(data);
}
onSubmit() {
  
  this._service_cmt.updateSocial(this.comment,this._service_cmt.rt_Update).subscribe(res => {
    if (res && res.status == 1) {
      this.closeDia(res.data);
    }
  });
}

  ngOnInit() {
    this.comment = this.data;
    console.log('comment edit ',this.comment);
    this.changeDetectorRefs.detectChanges();
    
  }

}
