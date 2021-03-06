const db = require('./db');

class Question {
    constructor(id,question,answer,ord,adventure_id) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.ord = ord;
        this.adventure_id = adventure_id;
    }

    // CREATE
    static createQuestion(question,answer,ord,adventure_id){
        return db.one(`insert into questions
        (question,answer,ord,adventure_id)
        values
        ($1,$2,$3,$4)
        returning id`,[question,answer,ord,adventure_id])
            .then(data => {
                return new Question (data.id, question,answer,ord,adventure_id);
            })
    }

    // RETRIEVE
    static getQuestionsByAdventure(adventure_id){
        return db.any('select * from questions where adventure_id=$1',[adventure_id])
            .then(data => {
                let questionArray = data.map(indQuestion => {
                    return new Question (indQuestion.id, indQuestion.question, indQuestion.answer,indQuestion.ord,indQuestion.adventure_id)
                })
                return questionArray
            })
    }

    static getQuestionsByQuestion_Id(question_id){
        return db.one('select * from questions where id=$1',[question_id])
            .then(data => {
                return new Question (data.id,data.question,data.answer,data.ord,data.adventure_id)
            })
    }


// Remaining CRUD functionality implemented when users can create their own adventures

// UPDATE

// DELETE

}

module.exports = Question