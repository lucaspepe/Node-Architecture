import { Submission } from "../../domain/entities/submission"
import { StudentsRepository } from "../repositories/StudentsRepository"
import { ChallengesRepository } from "../repositories/ChallengesRepository"

type CreateChallengeSubmissionRequest = {
    studentId: string;
    challengeId: string;
}

export class CreateChallengeSubmission {
    constructor(
        private studentRepository: StudentsRepository,
        private challengesRepository: ChallengesRepository
    ) {}

    async execute({ studentId, challengeId}: CreateChallengeSubmissionRequest) {

        const student = await this.studentRepository.findById(studentId)
        
        if (!student) {
            throw new Error('Students does not exists.');
        }
        
        const challenges = await this.challengesRepository.findById(challengeId)
        
        if (!challenges) {
            throw new Error('Students does not exists.');
        }
        
        const submission =  Submission.create({
            studentId,
            challengeId,
        })

        return submission
    }
}