import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule} from '@angular/material/progress-bar';

import { SharedModule } from './shared/modules/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { Socket } from './shared/constants/constants';

import { TokenInterceptor } from './shared/services/auth/token.interceptor';

import { AuthService } from './shared/services/auth/auth.service';
import { LoginService } from './shared/services/login/login.service';
import { LoginSocketService } from './shared/services/login/login-socket.service';
import { LoaderService } from './shared/services/loader/loader.service';
import { CheckLoginService }from './shared/guards/check-login.service';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { TopicService } from './shared/services/topic/topic.service';
import { PostService } from './shared/services/post/post.service';
import { UserService } from './shared/services/user/user.service';
import { UserSocketService } from './shared/services/user/user-socket.service';
import { PostSocketService } from './shared/services/post/post-socket.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatProgressBarModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    LoginService,
    LoginSocketService,
    LoaderService,
    AuthGuardService,
    CheckLoginService,
    PostService,
    PostSocketService,
    TopicService,
    UserService,
    UserSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private loginSocketService: LoginSocketService,
    private postSocketService: PostSocketService,
    private userSocketService: UserSocketService
  ) {
    this.consumeSocketEven();
  }

  consumeSocketEven() {
    this.loginSocketService.consumeEventOnRegister();
    this.postSocketService.consumeEventOnAdd();
    this.postSocketService.consumeEventOnGetPosts();
    this.userSocketService.consumeEventOnGetPostedDocuments();
  }
}
