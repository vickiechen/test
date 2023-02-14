import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CandidatesController extends Controller {
  @service store

  newApplicant = {} 

  @action
  addNew () {
    if(!this.validateApplicant()) return false;
    
    let post = this.store.createRecord('applicant', this.newApplicant);
    let self = this;
    post.save().then((res)=>{
      if(res.isError){
        alert(self.newApplicant.name + " failed!");
      }else{
        alert(self.newApplicant.name + " has been added!");

        //reload the list of applicants
        self.set('model', self.store.query('applicant',{})); 

        //empty the input fields
        self.set('newApplicant', {});
      }
    });
  }

  validateApplicant(){
    if(!this.newApplicant.name || this.newApplicant.name ==="") {
      alert("Invalid Name");
      return false;
    }
    if(!this.newApplicant.age || this.newApplicant.age ==="" || isNaN(this.newApplicant.age)) {
      alert("Invalid Age");
      return false;
    }
    return true;
  }
}
