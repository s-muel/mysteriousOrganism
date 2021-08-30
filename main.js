// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  const pAquorFactory = (number,dnaBase) =>{
      return {
          _specimenNum:number,
          _dna: dnaBase,
          get dna(){
              return this._dna;
          },
          set dna(dnaIn){
              this._dna = dnaIn;
          },
          get num(){
              return this._specimenNum;
          },
          coincidences(array1,array2){
              let counter = 0;
              if (array1.length !== array2.length){
                  throw new Error('array lengths must coincide!'); 
              }
  
              const len = array1.length;
  
              for (let i=0;i<len;i++){
                  if (array1[i] === array2[i]){
                      counter++;
                  }
              }
  
              return counter;
  
          },
          mutate(){
              const dnaBases = ['A', 'T', 'C', 'G'];
              const len = this.dna.length;
              const randInx = Math.floor(Math.random() * len);
              const base = this.dna[randInx]; 
              //console.log(`original base: ${this.dna}`);
              const mutatedBase = dnaBases.filter(b => b !== base);
              //console.log('selected base: '+base)
              //console.log('remaining bases: '+mutatedBase);
              const ind = Math.floor(Math.random() * 3);
              this.dna[randInx] = dnaBases[ind];
              //console.log(`mutated base: ${this.dna}`)
              return this.dna
  
          },
          compareDNA(pAequor){
              const howMany = this.coincidences(this.dna,pAequor.dna);
              percentage = (howMany/(this.dna.length)*100.0).toFixed(4);
              console.log(`specimen #${this.num} and specimen #${pAequor.num} have ${percentage}% DNA in common`);
  
          },
          willLikelySurvive(){
              let countC = 0;
              let countG = 0;
              const len = this.dna.length;
  
              this.dna.forEach(element =>{
                  if (element === 'C'){
                      countC++;
                  }else if(element === 'G'){
                      countG++;
                  }
              })
  
              probC = countC/len*1.0;
              probG = countG/len*1.0;
              /*console.log(`DNA: ${this.dna}`)
              console.log(`C:${probC}`);
              console.log(`G:${probG}`);
              console.log(`prob: ${probC+probG}`)*/
              if (probC + probG > 0.6){
                  return true;
              }else{
                  return false;
              }
          },
          complementStrand(){
              const compDNA = [];
              this.dna.forEach(element =>{
                  switch (element){
                      case 'A':
                          compDNA.push('T');
                          break;
                      case 'C':
                          compDNA.push('G');
                          break;
                      case 'T':
                          compDNA.push('A');
                          break;
                      case 'G':
                          compDNA.push('C');
                          break;
                  }
              })
              return compDNA;
          }
      }
  
  }
  
  
  const specimen = pAquorFactory(1524,mockUpStrand());
  const anotherOne = pAquorFactory(2356,mockUpStrand());
  
  specimen.compareDNA(anotherOne);
  console.log(specimen.willLikelySurvive());
  
  //I will create 30 specimens using the factory function
  
  const population = [];
  
  for (let i=0;i<30;i++){
      population.push(pAquorFactory(i,mockUpStrand()));
  }
  
  //example of usage
  
  console.log(population[20].dna)
  console.log(population[20].complementStrand())