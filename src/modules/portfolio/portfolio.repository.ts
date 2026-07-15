import { Portfolio, IPortfolio } from "./portfolio.model.js";

export class PortfolioRepository {
  async create(
    data: Partial<IPortfolio>,
  ) {
    return Portfolio.create(data);
  }

  async findById(
    portfolioId: string,
  ) {
    return Portfolio.findById(portfolioId);
  }

  async findByProfileId(
    profileId: string,
  ) {
    return Portfolio.find({
      profileId,
    }).sort({
      createdAt: -1,
    });
  }

  async update(
    portfolioId: string,
    data: Partial<IPortfolio>,
  ) {
    return Portfolio.findByIdAndUpdate(
      portfolioId,
      data,
      {
        new: true,
      },
    );
  }

  async delete(
    portfolioId: string,
  ) {
    return Portfolio.findByIdAndDelete(
      portfolioId,
    );
  }
}