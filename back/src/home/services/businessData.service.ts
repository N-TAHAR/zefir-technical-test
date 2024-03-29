import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial } from 'typeorm';
import { BusinessData } from '../entities/businessData.entity';
import BusinessDataCustomRepository from '../repositories/businessData.custom.repository';
import HomeService from './home.service';
import calculateServiceFee from '../utils/feeCalculator.util';
@Injectable()
export default class BusinessDataService {
  constructor(
    @InjectRepository(BusinessDataCustomRepository)
    private readonly businessDataRepository: BusinessDataCustomRepository,
    private readonly homeService: HomeService
  ) { }

  async generateBusinessDataForHome(
    homeUuid: string,
    initialOfferPrice: number,
    finalOfferPrice: number,
    targetSalePrice: number
  ): Promise<BusinessData> {
    // TODO : write business data logic to compute :
    //  - serviceFees (see README)
    //  - negotiation margin (see README)
    const home = await this.homeService.findHome(homeUuid)
    const negotiationMargin = this.computeNegotiationMargin(finalOfferPrice, targetSalePrice);
    const serviceFees = this.computeServiceFees(finalOfferPrice, home.zipcode);

    const businessData = await this.createBusinessData({
      homeUuid,
      initialOfferPrice,
      finalOfferPrice,
      targetSalePrice,
      serviceFees,
      negotiationMargin
    });
    await this.homeService.updateHome(homeUuid, {
      businessDataUuid: businessData.uuid,
    });
    return businessData;
  }

  computeNegotiationMargin(finalOfferPrice: number, targetSalePrice: number, maxNegotiationMargin: number = 0.07): number {
    const relativeMargin = (targetSalePrice / finalOfferPrice) - 1;
    const minMargin = Math.min(relativeMargin, maxNegotiationMargin).toFixed(3);

    return Math.abs(Number(minMargin));
  }

  computeServiceFees(finalOfferPrice: number, zipCode: string): number {
    const regionCode = zipCode.substring(0, 2);
    return calculateServiceFee(finalOfferPrice, regionCode);
  }

  async findBusinessDataByHomeUuid(homeUuid: string): Promise<BusinessData> {
    const results = await this.businessDataRepository.find({ homeUuid });
    if (results.length !== 1) {
      throw Error(
        `Could not find business data from home with uuid ${homeUuid}`
      );
    }
    return results[0];
  }

  async findBusinessData(uuid: string): Promise<BusinessData> {
    const results = await this.businessDataRepository.findByIds([uuid]);
    if (results.length !== 1) {
      throw Error(`Could not find business data with uuid ${uuid}`);
    }
    return results[0];
  }

  async createBusinessData(
    inputBusinessData: DeepPartial<BusinessData>
  ): Promise<BusinessData> {
    const businessData = await this.businessDataRepository.create(
      inputBusinessData
    );
    return this.businessDataRepository.save(businessData);
  }

  async deleteBusinessData(uuid: string): Promise<number> {
    const result = await this.businessDataRepository.delete({ uuid: uuid });
    if (!result.affected) {
      throw Error(`Could not delete business data with uuid ${uuid}`);
    }
    return result.affected;
  }
}
