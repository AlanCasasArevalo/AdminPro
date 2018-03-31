import { Service } from './service.model';
import { User } from './user.model';
export class Appoitment {

    constructor(
        user: User,
        service: Service,
        isConfirmed: boolean,
        isCancelled: boolean,
        date: Date,
        address: string,
        extraInfo: string
    ) {}

}
/*
  customer        : { type: mongoose.Schema.ObjectId, ref: User },
  professional    : { type: mongoose.Schema.ObjectId, ref: User },
  latitude        : Number,
  longitude       : Number,
*/
