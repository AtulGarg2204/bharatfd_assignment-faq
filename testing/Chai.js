import request from "supertest";
import { expect } from "chai";
import app from "../server.js"; // Assuming app.js is your server entry point
import redisClient from "../config/RedisConfig.js";

describe("FAQ API Routes with Multi-language Support", function () {
  this.timeout(5000); // Increase timeout to 5 seconds

  let faqId;
  const faqInputs = [
    {
      question: "What is Node.js?",
      answer: "Node.js is a runtime environment that allows you to run JavaScript on the server side.",
      targetLanguage: "en"
    },
    {
      question: "What is Node.js?",
      answer: "Node.js is a runtime environment that allows you to run JavaScript on the server side.",
      targetLanguage: "hi"
    },
    {
      question: "What is Node.js?",
      answer: "Node.js is a runtime environment that allows you to run JavaScript on the server side.",
      targetLanguage: "ur"
    }
  ];

  faqInputs.forEach(({ question, answer, targetLanguage }) => {
    it(`create a new FAQ with translations in ${targetLanguage}`, async () => {
      const res = await request(app).post("/Faqs/postfaq").send({ question, answer, targetLanguage });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Faq Created Successfully");
      expect(res.body.faq).to.have.property("question", question);
      expect(res.body.faq).to.have.property("answer", answer);
      
      faqId = res._body.faq._id;
      expect(faqId).to.not.be.undefined;

      const cachedFaqs = await redisClient.get(`faqs:${targetLanguage}`);
      expect(cachedFaqs).to.be.null;
    });

    it(`fetch all FAQs in ${targetLanguage}`, async () => {
      const res = await request(app).get("/Faqs").query({ targetLanguage });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("translatedFaqs");
      expect(res.body.translatedFaqs).to.be.an("array").that.is.not.empty;
    });

    it(`update an existing FAQ and translate into ${targetLanguage}`, async () => {
      const res = await request(app)
        .put(`/Faqs/${faqId}`)
        .send({
          question: "What is Node.js in detail?",
          answer: "It is built on Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model, making it lightweight and efficient.",
          targetLanguage
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Successfully Updated Faq");
      expect(res.body.UpdatedFAQ).to.have.property("question", "What is Node.js in detail?");
      expect(res.body.UpdatedFAQ).to.have.property("answer", "It is built on Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model, making it lightweight and efficient.");
    });

    it(`delete a FAQ and clear cache for ${targetLanguage}`, async () => {
      const res = await request(app).delete(`/Faqs/${faqId}`).send({ targetLanguage });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("message", "Faq Deleted");
    });
  });
});
