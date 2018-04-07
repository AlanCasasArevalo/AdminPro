import { Service } from './service.model';
import { User } from './user.model';
export class Appointment {

    constructor(
        public service?: string,
        public customer?: string,
        public professional?: string,
        public date?: Date,
        public address?: string,
        public extraInfo?: string,
        public isCancelled?: boolean,
        public isConfirmed?: boolean,
        public _id?: string
    ) {}

}
/*
  customer        : { type: mongoose.Schema.ObjectId, ref: User },
  professional    : { type: mongoose.Schema.ObjectId, ref: User },
  latitude        : Number,
  longitude       : Number,
*/
