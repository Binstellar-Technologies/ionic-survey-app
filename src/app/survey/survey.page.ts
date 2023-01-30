import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IonContent, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {
  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  @ViewChild('dateSlider') docSlides: IonSlides;
  @ViewChild('basicFormRef', { static: false }) basicFormRef: NgForm;
  @ViewChild('familyFormRef', { static: false }) familyFormRef: NgForm;
  @ViewChild('HobbyFormRef', { static: false }) HobbyFormRef: NgForm;
  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };
  isSubmitted = false;
  public slides: any;
  public currentSlide: any;
  public isBeginning: boolean = true;
  public isEnd: boolean = false;
  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true,
    allowTouchMove: false,
    autoHeight: true,
  };
   basicForm: any;
   familyForm: any;
   HobbyForm: any;
  constructor() { }

  ngOnInit() {
    this.buildSlides();
    this.surveyForm();
  }

  surveyForm(){
    this.basicForm = new FormGroup({
      age : new FormControl(''),
      gender: new FormControl('')
    }); 

    this.familyForm = new FormGroup({
      members: new FormControl('')
    });

    this.HobbyForm = new FormGroup({
      hobby: new FormControl('')
    })
  }
  get basicFormControl() {
    return this.basicForm.controls;
  }

  get familyFormControl() {
    return this.familyForm.controls;
  }

  get HobbyFormControl() {
    return this.HobbyForm.controls;
  }

  submit(){
    let formData = {
      'age' : this.basicForm.value.age,
      'gender' : this.basicForm.value.gender,
      'members' : this.familyForm.value.members,
      'hobby': this.HobbyForm.value.hobby,
    }
    console.log(formData)
  }
  ionViewDidEnter() {
    this.ionSlides.updateAutoHeight();
    this.ionSlides.slideTo(0);
    this.slides.forEach((element : any) => {
      element.isCompleted = false;
    });
  }

  onSlidesDidChange() {
    this.ionContent.scrollToTop();
  }

  async onSlidesChanged() {
    const index = await this.ionSlides.getActiveIndex();
    this.currentSlide = this.slides[index];
    this.isBeginning = await this.ionSlides.isBeginning();
    this.isEnd = await this.ionSlides.isEnd();
  }

  buildSlides() {
    const slides = [
      {
        name: 'Basic',
        isCompleted: false
      },
      {
        name: 'Family',
        isCompleted: false
      },
      {
        name: 'Hobby',
        isCompleted: false
      },
      {
        name: 'Submit',
        isCompleted: false
      }
    ];
    this.currentSlide = slides[0];
    this.slides = slides;
  }



  onBackButtonTouched() {
    this.slides.forEach((element : any, index : any) => {
      if (element.name === this.currentSlide.name) {
        this.slides[index - 1].isCompleted = false;
        element.isCompleted = false;
      }
    });
    this.ionSlides.slidePrev();
    this.ionContent.scrollToTop();
  }

  onNextButtonTouched() {
    if (this.currentSlide.name === 'Basic') {
      this.isSubmitted = true;
      if (this.basicForm.valid) {
        this.addSelected();
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }
    } else if (this.currentSlide.name === 'Family') {
      this.isSubmitted = true;
      if (this.familyForm.valid) {
        this.addSelected();
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }
    } else if (this.currentSlide.name === 'Hobby') {
      this.isSubmitted = true;
      console.log(this.HobbyForm, "HobbyForm")
      if (this.HobbyForm.valid) {
        this.addSelected();
        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
        this.submit()
      }
    } else {
      this.addSelected();
      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
  }

  addSelected() {
    this.slides.forEach((element : any) => {
      if (element.name === this.currentSlide.name) {
        element.isCompleted = true;
      }
    });
  }
}
