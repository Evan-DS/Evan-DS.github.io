import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import nodemailer from "nodemailer";

// Email configuration
const createEmailTransporter = () => {
  // For development, you can use a service like Gmail with app passwords
  // or services like SendGrid, Mailgun, etc.
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    }
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Send email notification to Evan
      try {
        const transporter = createEmailTransporter();
        
        const mailOptions = {
          from: process.env.EMAIL_USER || 'noreply@evandossantos.com',
          to: 'evangeorgedossantos@yahoo.ca',
          subject: `New Portfolio Contact: ${validatedData.name}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
          `
        };

        // Send confirmation email to sender
        const confirmationOptions = {
          from: process.env.EMAIL_USER || 'noreply@evandossantos.com',
          to: validatedData.email,
          subject: 'Thank you for contacting Evan Dos Santos',
          html: `
            <h3>Thank you for your message!</h3>
            <p>Hi ${validatedData.name},</p>
            <p>Thank you for reaching out through my portfolio website. I have received your message and will get back to you within 24-48 hours.</p>
            <p><strong>Your message:</strong></p>
            <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
            <p>Best regards,<br>Evan Dos Santos<br>Software Engineer & IT Systems Specialist</p>
          `
        };

        // Only attempt to send emails if email credentials are configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
          await transporter.sendMail(mailOptions);
          await transporter.sendMail(confirmationOptions);
          console.log('Emails sent successfully for submission:', submission.id);
        } else {
          console.log('Email not configured. Submission stored:', submission.id);
        }
        
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails, just log it
      }
      
      console.log("New contact submission:", submission);
      
      res.json({ 
        success: true, 
        message: "Thank you for your message! I will get back to you soon." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again." 
        });
      }
    }
  });

  // Get all contact submissions (for admin use)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Failed to fetch contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  // Download resume endpoint
  app.get("/api/resume", (req, res) => {
    const path = require('path');
    const fs = require('fs');
    
    // Check if resume exists in attached assets first
    const attachedResume = path.join(process.cwd(), 'attached_assets', 'Résumé-Evan_Dos_Santos-2025_1754433754150.pdf');
    
    if (fs.existsSync(attachedResume)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Evan_Dos_Santos_Resume.pdf"');
      res.sendFile(attachedResume);
    } else {
      // Fallback to placeholder if file doesn't exist
      res.status(404).json({ message: "Resume not found. Please contact Evan directly." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
