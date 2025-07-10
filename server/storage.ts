import { users, questions, type User, type InsertUser, type Question, type InsertQuestion } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Questions management
  getAllQuestions(): Promise<Question[]>;
  getQuestionById(id: number): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  updateQuestion(id: number, question: Partial<InsertQuestion>): Promise<Question | undefined>;
  deleteQuestion(id: number): Promise<boolean>;
  searchQuestions(searchTerm: string): Promise<Question[]>;
  getQuestionsByCategory(category: string): Promise<Question[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private questions: Map<number, Question>;
  private currentUserId: number;
  private currentQuestionId: number;

  constructor() {
    this.users = new Map();
    this.questions = new Map();
    this.currentUserId = 1;
    this.currentQuestionId = 1;
    this.seedInitialData();
  }

  private seedInitialData() {
    // Seed with real Airtel Payment Bank questions from web search
    const initialQuestions: InsertQuestion[] = [
      {
        text: "Under which act are payment banks registered?",
        category: "regulatory",
        optionA: "Companies Act, 2013 only",
        optionB: "Companies Act, 2013 and licensed under Section 22 of Banking Regulation Act, 1949",
        optionC: "Banking Regulation Act, 1949 only",
        optionD: "RBI Act, 1934",
        correctAnswer: "B",
        explanation: "Payment banks are registered as public limited companies under the Companies Act, 2013, and licensed under Section 22 of the Banking Regulation Act, 1949."
      },
      {
        text: "What is the maximum balance limit for individual customers in payment banks?",
        category: "regulatory",
        optionA: "₹1,00,000",
        optionB: "₹2,00,000",
        optionC: "₹5,00,000",
        optionD: "No limit",
        correctAnswer: "B",
        explanation: "RBI has set the maximum balance limit for individual customers in payment banks at ₹2,00,000."
      },
      {
        text: "Which insurance company has partnered with Airtel Payments Bank for car insurance?",
        category: "services",
        optionA: "Bharti AXA General Insurance",
        optionB: "HDFC ERGO General Insurance",
        optionC: "ICICI Lombard General Insurance",
        optionD: "Bajaj Allianz General Insurance",
        correctAnswer: "A",
        explanation: "Airtel Payments Bank has partnered with Bharti AXA General Insurance to provide car insurance services to its customers."
      },
      {
        text: "What is Airtel Safe Pay?",
        category: "technical",
        optionA: "A payment gateway service",
        optionB: "A digital payment security feature that protects against online frauds",
        optionC: "A mobile app for payments",
        optionD: "A credit card service",
        correctAnswer: "B",
        explanation: "Airtel Safe Pay is a digital payment security feature launched by Airtel Payments Bank to protect customers from online frauds, offering protection against phishing, stolen credentials, and phone cloning."
      },
      {
        text: "What is the minimum balance requirement for Airtel Payments Bank account?",
        category: "customer",
        optionA: "Zero minimum balance",
        optionB: "₹500",
        optionC: "₹1,000",
        optionD: "₹2,000",
        correctAnswer: "A",
        explanation: "Airtel Payments Bank offers zero minimum balance requirement for its savings accounts, making it accessible to all customers."
      },
      {
        text: "When was Airtel Payments Bank launched?",
        category: "services",
        optionA: "January 2017",
        optionB: "March 2017",
        optionC: "December 2016",
        optionD: "April 2017",
        correctAnswer: "B",
        explanation: "Airtel Payments Bank was launched in March 2017 and was India's first payments bank to commence operations."
      },
      {
        text: "Where is Airtel Payments Bank headquarters located?",
        category: "services",
        optionA: "Mumbai",
        optionB: "New Delhi",
        optionC: "Bangalore",
        optionD: "Gurgaon",
        correctAnswer: "B",
        explanation: "Airtel Payments Bank headquarters is located in New Delhi, India."
      },
      {
        text: "What services can payment banks NOT provide?",
        category: "regulatory",
        optionA: "Savings accounts",
        optionB: "Current accounts",
        optionC: "Credit cards and loans",
        optionD: "Digital payments",
        correctAnswer: "C",
        explanation: "Payment banks cannot issue credit cards or provide loan advances as per RBI regulations."
      },
      {
        text: "What is the current account maintenance charge for Airtel Payments Bank (2024-25)?",
        category: "customer",
        optionA: "₹0 (Free)",
        optionB: "₹42 + 18% GST per quarter",
        optionC: "₹100 per quarter",
        optionD: "₹25 per month",
        correctAnswer: "B",
        explanation: "As of 2024-25, Airtel Payments Bank charges ₹42 + 18% GST per quarter as account maintenance charges."
      },
      {
        text: "What is the minimum capital requirement for payment banks?",
        category: "regulatory",
        optionA: "₹50 crore",
        optionB: "₹100 crore",
        optionC: "₹200 crore",
        optionD: "₹500 crore",
        correctAnswer: "B",
        explanation: "RBI has set the minimum capital requirement for payment banks at ₹100 crore."
      }
    ];

    initialQuestions.forEach(q => {
      const question: Question = {
        id: this.currentQuestionId++,
        ...q,
        isActive: true
      };
      this.questions.set(question.id, question);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(q => q.isActive);
  }

  async getQuestionById(id: number): Promise<Question | undefined> {
    const question = this.questions.get(id);
    return question?.isActive ? question : undefined;
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.currentQuestionId++;
    const question: Question = { 
      id, 
      ...insertQuestion,
      isActive: true
    };
    this.questions.set(id, question);
    return question;
  }

  async updateQuestion(id: number, updateData: Partial<InsertQuestion>): Promise<Question | undefined> {
    const question = this.questions.get(id);
    if (!question || !question.isActive) return undefined;

    const updatedQuestion: Question = { ...question, ...updateData };
    this.questions.set(id, updatedQuestion);
    return updatedQuestion;
  }

  async deleteQuestion(id: number): Promise<boolean> {
    const question = this.questions.get(id);
    if (!question) return false;

    // Soft delete
    question.isActive = false;
    this.questions.set(id, question);
    return true;
  }

  async searchQuestions(searchTerm: string): Promise<Question[]> {
    const term = searchTerm.toLowerCase();
    return Array.from(this.questions.values()).filter(q => 
      q.isActive && (
        q.text.toLowerCase().includes(term) ||
        q.explanation.toLowerCase().includes(term) ||
        q.optionA.toLowerCase().includes(term) ||
        q.optionB.toLowerCase().includes(term) ||
        q.optionC.toLowerCase().includes(term) ||
        q.optionD.toLowerCase().includes(term)
      )
    );
  }

  async getQuestionsByCategory(category: string): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(q => 
      q.isActive && q.category === category
    );
  }
}

export const storage = new MemStorage();
