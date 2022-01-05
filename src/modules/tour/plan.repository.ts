import { EntityRepository, Repository } from 'typeorm';
import { Plan } from './entities/plan.enity';

@EntityRepository(Plan)
export class PlanRepository extends Repository<Plan> {}
