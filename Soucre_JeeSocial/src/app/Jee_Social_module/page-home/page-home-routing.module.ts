import { PageHomeComponent } from './page-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadPageHomeComponent } from './load-page-home/load-page-home.component';

const routes: Routes = [
	
	// {
	// 	path: 'page_personal/:id',
	// 	component: TrangCaNhanComponent,

	// },
  {
			

		path: '',
		component: PageHomeComponent,
		children: [
			{
				path: '',
				component: LoadPageHomeComponent,
				// children:[
				// 	{
				// 		path: 'chat',
				// 		component: ChatboxComponent,
						
				// 	},	
				// ]
				
			},	
			
			

			// {
			// 	path: 'detail/:id',
			// 	component: BaiDangDetailComponent,
				
			// },	
		

			// {
			// 	path: 'comment/:id',
			// 	component: DetailBaidangCommentComponent,
				
			// },	
			// {
			// 	path: 'group/:id_group',
			// 	component: GroupViewComponent,

			// },	

			

			

			
		]
	}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageHomeRoutingModule { }
