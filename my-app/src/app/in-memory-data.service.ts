import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
  { id: 0, name: 'Xolani Noma', dob:'1/04/2000', gender: 'Male', diagnosis: 'True',gmfcs_level: '9',caregiver_name: 'Samuel Norrs',contact:'0875596636', residential_area:'Alex' },
  { id: 1, name: 'Senzo Culo', dob:'9/12/1999', gender: 'Male', diagnosis: 'True',gmfcs_level: '4',caregiver_name: 'Samuel Norrs',contact:'0875596636', residential_area:'Tshimologong' },
  { id: 2, name: 'Alex Samuel', dob:'6/9/2001', gender: 'Female', diagnosis: 'True',gmfcs_level: '3',caregiver_name: 'Samuel Norrs',contact:'0875596636', residential_area:'Midrand' },
  { id: 3, name: 'Ned Nkomo', dob:'14/04/1997', gender: 'Male', diagnosis: 'True',gmfcs_level: '10',caregiver_name: 'Samuel Norrs',contact:'0875596636', residential_area:'Braam' },
  { id: 0, name: 'Xolani Noma', dob:'1/04/2000', gender: 'Male', diagnosis: 'True',gmfcs_level: '9',caregiver_name: 'Samuel Norrs',contact:'0875596636', residential_area:'Alex' }
    ];
    return {heroes};
  }
}
