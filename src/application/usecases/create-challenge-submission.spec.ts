import { CreateChallengeSubmission } from "./create-challenge-submission";
import { InMemoryStudentsRepository } from "../../../tests/repositories/in-memory-students-repository";
import { Student } from "../../domain/entities/student";
import { InMemoryChallengesRepository } from "../../../tests/repositories/in-memory-challenges-repository";
import { Challenge } from "../../domain/entities/challenge";

describe('Create challenge submission use case', () => {
    it('should be able to create a new challenge submission', async () => {
        const studentsRepository = new InMemoryStudentsRepository();
        const challengesRepository = new InMemoryChallengesRepository();

        const student = Student.create({
            name: 'Lucas',
            email: 'lucas@example.com'
        })

        const challenge = Challenge.create({
            title: 'Challenge 01',
            instructionsUrl: 'http://example.com'
        })

        studentsRepository.items.push(student);
        challengesRepository.items.push(challenge);

        const sut = new CreateChallengeSubmission(
            studentsRepository,
            challengesRepository
        );

        const response = await sut.execute({
            studentId: student.id,
            challengeId: challenge.id,
        })

        expect(response.props).toBeTruthy()
    });
});