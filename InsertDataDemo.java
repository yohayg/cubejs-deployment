import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import static java.util.Calendar.MINUTE;

public class InsertDataDemo {
    public static void main(String[] args) {
        Connection connection = null;
        Statement stmt = null;
        try
        {
            Class.forName("org.mariadb.jdbc.Driver");
            connection = DriverManager
                    .getConnection("jdbc:mariadb://localhost:3306/test1", "root", "");

            stmt = connection.createStatement();
            SimpleDateFormat sdf =
                    new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            stmt.execute("delete from impressions");

            int n = 1;
            Random rand = new Random();
            Calendar calendar = Calendar.getInstance();
            calendar.set(2019,6,27,0,0,0);
            for(int i=1; i<=1000; i++) {
                Date time = calendar.getTime();
                int offerId = Math.abs(rand.nextInt(2));
                stmt.execute("INSERT INTO impressions (created_at,request_id, offer_id, creative_id ) "
                        + "VALUES ('" + sdf.format(time) + "',"+n+","+ offerId+",1)");
                calendar.add(MINUTE,Math.abs(rand.nextInt(6)));
                n++;
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }finally {
            try {
                stmt.close();
                connection.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}