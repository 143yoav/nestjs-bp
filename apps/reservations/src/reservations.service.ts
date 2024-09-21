import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationsRepository) {}

  create(createReservationDto: CreateReservationDto) {
    this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
    });
  }

  findAll() {
    return this.reservationRepository.find({});
  }

  findOne(id: string) {
    return this.reservationRepository.findOne({ _id: id });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    this.reservationRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateReservationDto },
    );
  }

  remove(id: string) {
    this.reservationRepository.findOneAndDelete({ _id: id });
  }
}
