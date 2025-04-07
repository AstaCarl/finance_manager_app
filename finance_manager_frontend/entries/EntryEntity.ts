
export class EntryEntity {
    id: number | undefined;
    
    constructor(
        public description: string,
        public amount: number,
        public date: Date,
        public category: {id: number; title: string} | undefined,
      ) {}
  }