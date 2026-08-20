import nodemailer from "nodemailer";
import { getOTPEmailTemplate, getResetSuccessEmailTemplate, getWelcomeEmailTemplate, getGoalSuccessEmailTemplate, getFinancialReportEmailTemplate, IFinancialReportTemplateParams, IGoalSuccessTemplateParams } from "./templates";

export const sendOTPEmail = async (to: string, otp: string, name?: string) => {
  console.log(`\n==================================================`);
  console.log(`🔑 [OTP GENERATED] Email: ${to} | OTP Code: ${otp}`);
  console.log(`==================================================\n`);

  // Get template subject, html, and text from templates module
  const { subject, html, text } = getOTPEmailTemplate({ otp, name });

  // If SMTP environment variables are set in .env, send real email via SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"হিসাব কিতাব" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
        headers: {
          "X-Priority": "1",
          "X-MSMail-Priority": "High",
          Importance: "high",
        },
      });
      console.log(`✅ [EMAIL SENT] OTP successfully mailed to ${to}`);
    } catch (error) {
      console.error("❌ [EMAIL ERROR] Failed to send email via SMTP:", error);
    }
  }
};

export const sendResetSuccessEmail = async (to: string, name?: string) => {
  console.log(`\n==================================================`);
  console.log(`🔒 [PASSWORD RESET SUCCESS] Email: ${to}`);
  console.log(`==================================================\n`);

  const { subject, html, text } = getResetSuccessEmailTemplate({ name });

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"হিসাব কিতাব" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });
      console.log(`✅ [EMAIL SENT] Password reset confirmation mailed to ${to}`);
    } catch (error) {
      console.error("❌ [EMAIL ERROR] Failed to send success email via SMTP:", error);
    }
  }
};

export const sendWelcomeEmail = async (to: string, name?: string) => {
  console.log(`\n==================================================`);
  console.log(`✨ [WELCOME EMAIL] Email: ${to} | Name: ${name}`);
  console.log(`==================================================\n`);

  const { subject, html, text } = getWelcomeEmailTemplate({ name });

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"হিসাব কিতাব" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });
      console.log(`✅ [EMAIL SENT] Welcome email successfully mailed to ${to}`);
    } catch (error) {
      console.error("❌ [EMAIL ERROR] Failed to send welcome email via SMTP:", error);
    }
  }
};

export const sendGoalSuccessEmail = async (to: string, params: Omit<IGoalSuccessTemplateParams, "appName">) => {
  console.log(`\n==================================================`);
  console.log(`🏆 [GOAL ACCOMPLISHED EMAIL] Email: ${to} | Goal: ${params.goalName}`);
  console.log(`==================================================\n`);

  const { subject, html, text } = getGoalSuccessEmailTemplate(params);

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"হিসাব কিতাব" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });
      console.log(`✅ [EMAIL SENT] Goal success congratulations mailed to ${to}`);
    } catch (error) {
      console.error("❌ [EMAIL ERROR] Failed to send goal email via SMTP:", error);
    }
  }
};

export const sendFinancialReportEmail = async (to: string, params: Omit<IFinancialReportTemplateParams, "appName">) => {
  console.log(`\n==================================================`);
  console.log(`📊 [FINANCIAL REPORT EMAIL] Email: ${to}`);
  console.log(`==================================================\n`);

  const { subject, html, text } = getFinancialReportEmailTemplate(params);

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"হিসাব কিতাব" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });
      console.log(`✅ [EMAIL SENT] Financial report successfully mailed to ${to}`);
    } catch (error) {
      console.error("❌ [EMAIL ERROR] Failed to send financial report email via SMTP:", error);
    }
  }
};

export interface IUserFeedbackParams {
  category: string;
  message: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
}

export const sendUserFeedbackEmail = async (params: IUserFeedbackParams) => {
  const to = "mdhamim5088@gmail.com";
  const categoryTitle =
    params.category === "feature"
      ? "💡 নতুন ফিচার আইডিয়া (Feature Idea)"
      : params.category === "question"
      ? "❓ সাধারণ প্রশ্ন (Question)"
      : params.category === "bug"
      ? "🐛 বাগ বা সমস্যা রিপোর্ট (Bug Report)"
      : "⭐ সাধারণ মতামত ও ফিডব্যাক (General Feedback)";

  const subject = `[হিসাব কিতাব ফিডব্যাক] ${categoryTitle} - ${params.userName || "ব্যবহারকারী"}`;

  const text = `
হিসাব কিতাব অ্যাপ ফিডব্যাক / প্রশ্ন:
------------------------------------------
ক্যাটাগরি: ${categoryTitle}
প্রেরক: ${params.userName || "ব্যবহারকারী"}
ইমেইল: ${params.userEmail || "N/A"}
ফোন: ${params.userPhone || "N/A"}
তারিখ: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}

বার্তা:
${params.message}
  `;

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
      .header { background: linear-gradient(135deg, #1e293b, #0f172a); padding: 24px; text-align: center; color: #ffffff; }
      .header h1 { margin: 0; font-size: 20px; font-weight: 800; color: #10b981; }
      .header p { margin: 6px 0 0; font-size: 13px; color: #94a3b8; }
      .badge { display: inline-block; padding: 6px 14px; background: rgba(16, 185, 129, 0.15); color: #10b981; border-radius: 20px; font-weight: 700; font-size: 13px; margin: 16px 0 0; }
      .content { padding: 24px; }
      .info-card { background: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 20px; border: 1px solid #e2e8f0; }
      .info-row { display: flex; margin-bottom: 8px; font-size: 14px; }
      .info-label { width: 100px; color: #64748b; font-weight: 600; }
      .info-val { color: #0f172a; font-weight: 700; }
      .message-box { background: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 18px; font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; word-break: break-word; }
      .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>📊 হিসাব কিতাব অ্যাপ</h1>
        <p>সরাসরি ইউজার ফিডব্যাক ও সাপোর্ট মেসেজ</p>
        <div class="badge">${categoryTitle}</div>
      </div>
      <div class="content">
        <div class="info-card">
          <div class="info-row">
            <span class="info-label">👤 নাম:</span>
            <span class="info-val">${params.userName || "ব্যবহারকারী"}</span>
          </div>
          <div class="info-row">
            <span class="info-label">📧 ইমেইল:</span>
            <span class="info-val">${params.userEmail || "N/A"}</span>
          </div>
          <div class="info-row" style="margin-bottom:0;">
            <span class="info-label">⏰ সময়:</span>
            <span class="info-val">${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}</span>
          </div>
        </div>
        <h3 style="color:#1e293b; margin-top:0; font-size:15px;">📝 ব্যবহারকারীর বার্তা:</h3>
        <div class="message-box">${params.message}</div>
      </div>
      <div class="footer">
        এই ইমেইলটি হিসাব কিতাব অ্যাপের সাপোর্ট ও ফিডব্যাক সিস্টেম থেকে স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে।
      </div>
    </div>
  </body>
  </html>
  `;

  console.log(`\n==================================================`);
  console.log(`📩 [USER FEEDBACK SUBMITTED] To: ${to} | Category: ${categoryTitle}`);
  console.log(`==================================================\n`);

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"হিসাব কিতাব ফিডব্যাক" <${process.env.SMTP_USER}>`,
        to,
        replyTo: params.userEmail || undefined,
        subject,
        text,
        html,
        headers: {
          "X-Priority": "1",
          "X-MSMail-Priority": "High",
          Importance: "high",
        },
      });
      console.log(`✅ [FEEDBACK EMAIL SENT] Feedback successfully delivered to ${to}`);
      return { success: true };
    } catch (error) {
      console.error("❌ [EMAIL ERROR] Failed to send feedback email via SMTP:", error);
      return { success: false, error };
    }
  }
  return { success: true };
};
